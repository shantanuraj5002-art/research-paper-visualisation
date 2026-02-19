import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';
import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

// Determine which provider to use
const LLM_PROVIDER = process.env.LLM_PROVIDER || 'auto';

// Initialize clients
let anthropicClient, geminiClient, openaiClient, groqClient;

if (process.env.ANTHROPIC_API_KEY) {
  anthropicClient = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}

if (process.env.GOOGLE_API_KEY) {
  geminiClient = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
}

if (process.env.OPENAI_API_KEY) {
  openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

if (process.env.GROQ_API_KEY) {
  groqClient = new Groq({ apiKey: process.env.GROQ_API_KEY });
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Auto-detect which provider to use
function getAvailableProvider() {
  if (LLM_PROVIDER !== 'auto') {
    return LLM_PROVIDER;
  }
  
  if (process.env.GROQ_API_KEY) return 'groq';
  if (process.env.GOOGLE_API_KEY) return 'gemini';
  if (process.env.OPENAI_API_KEY) return 'openai';
  if (process.env.ANTHROPIC_API_KEY) return 'anthropic';
  
  throw new Error('No LLM API key configured. Please add GROQ_API_KEY, GOOGLE_API_KEY, OPENAI_API_KEY, or ANTHROPIC_API_KEY to .env');
}

async function callGroq(prompt, systemPrompt = '', maxTokens = 4096) {
  if (!groqClient) {
    throw new Error('Groq API key not configured');
  }

  const messages = [];
  if (systemPrompt) {
    messages.push({ role: 'system', content: systemPrompt });
  }
  messages.push({ role: 'user', content: prompt });

  const response = await groqClient.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages,
    max_tokens: maxTokens
  });

  return response.choices[0].message.content;
}

async function callGemini(prompt, systemPrompt = '', maxTokens = 4096) {
  if (!geminiClient) {
    throw new Error('Google API key not configured');
  }

  // Try different model names in order of preference
  const modelNames = [
    'gemini-1.5-flash-latest',
    'gemini-1.5-flash',
    'gemini-pro',
    'gemini-1.0-pro'
  ];
  
  let lastError;
  
  for (const modelName of modelNames) {
    try {
      const model = geminiClient.getGenerativeModel({ 
        model: modelName,
        generationConfig: {
          maxOutputTokens: maxTokens,
        }
      });
      
      const fullPrompt = systemPrompt 
        ? `${systemPrompt}\n\n${prompt}` 
        : prompt;

      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      
      console.log(`Successfully used Gemini model: ${modelName}`);
      return response.text();
    } catch (error) {
      console.log(`Model ${modelName} failed, trying next...`);
      lastError = error;
      continue;
    }
  }
  
  throw new Error(`All Gemini models failed. Last error: ${lastError.message}`);
}

async function callOpenAI(prompt, systemPrompt = '', maxTokens = 4096) {
  if (!openaiClient) {
    throw new Error('OpenAI API key not configured');
  }

  const messages = [];
  if (systemPrompt) {
    messages.push({ role: 'system', content: systemPrompt });
  }
  messages.push({ role: 'user', content: prompt });

  const response = await openaiClient.chat.completions.create({
    model: 'gpt-4o-mini',
    messages,
    max_tokens: maxTokens
  });

  return response.choices[0].message.content;
}

async function callAnthropic(prompt, systemPrompt = '', maxTokens = 4096) {
  if (!anthropicClient) {
    throw new Error('Anthropic API key not configured');
  }

  const response = await anthropicClient.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: maxTokens,
    system: systemPrompt,
    messages: [{ role: 'user', content: prompt }]
  });

  return response.content[0].text;
}

export async function callLLM(prompt, systemPrompt = '', maxTokens = 4096) {
  const provider = getAvailableProvider();
  let lastError;
  
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      console.log(`Using LLM provider: ${provider} (attempt ${attempt + 1})`);
      
      switch (provider) {
        case 'groq':
          return await callGroq(prompt, systemPrompt, maxTokens);
        case 'gemini':
          return await callGemini(prompt, systemPrompt, maxTokens);
        case 'openai':
          return await callOpenAI(prompt, systemPrompt, maxTokens);
        case 'anthropic':
          return await callAnthropic(prompt, systemPrompt, maxTokens);
        default:
          throw new Error(`Unknown provider: ${provider}`);
      }
    } catch (error) {
      lastError = error;
      console.error(`LLM call attempt ${attempt + 1} failed:`, error.message);
      
      // Don't retry on authentication errors
      if (error.status === 401 || error.status === 403 || error.message.includes('credit balance')) {
        throw new Error(`Authentication/billing failed: ${error.message}`);
      }
      
      if (attempt < MAX_RETRIES - 1) {
        await sleep(RETRY_DELAY * (attempt + 1));
      }
    }
  }
  
  throw new Error(`LLM call failed after ${MAX_RETRIES} attempts: ${lastError.message}`);
}

export async function generateVisualAbstract(abstract, keyFindings) {
  const prompt = `Given this research paper abstract and key findings, generate a structured JSON outline for an infographic visualization.

Abstract: ${abstract}

Key Findings: ${keyFindings}

Return ONLY valid JSON with this structure:
{
  "title": "Main finding in 10 words or less",
  "methodology": "Brief methodology description",
  "keyDataPoints": [
    {"label": "Data point 1", "value": "Value/stat"},
    {"label": "Data point 2", "value": "Value/stat"}
  ],
  "conclusion": "Main conclusion in one sentence",
  "visualElements": [
    {"type": "icon", "label": "Element description"}
  ]
}`;

  const systemPrompt = 'You are an expert at creating visual abstracts for research papers. Return only valid JSON, no markdown formatting.';
  
  const response = await callLLM(prompt, systemPrompt, 2048);
  
  // Clean response to extract JSON
  const jsonMatch = response.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Failed to extract JSON from LLM response');
  }
  
  return JSON.parse(jsonMatch[0]);
}

export async function generatePlainSummary(abstract, conclusion) {
  const prompt = `Rewrite this research paper abstract and conclusion at a 6th-grade reading level. Make it engaging and easy to understand for a general audience.

Abstract: ${abstract}

Conclusion: ${conclusion}

Provide a plain-language summary that explains:
1. What the researchers studied
2. Why it matters
3. What they found
4. What it means for everyday people

Keep it under 200 words.`;

  const systemPrompt = 'You are an expert science communicator who makes complex research accessible to everyone.';
  
  return await callLLM(prompt, systemPrompt, 1024);
}

export async function generateLiteratureReview(paperContent, topic) {
  const prompt = `Based on this research paper content and topic, generate a structured literature review.

Topic: ${topic}

Paper Content: ${paperContent.substring(0, 8000)}

Generate a literature review that includes:
1. **Thematic Groupings**: Identify 3-5 major themes or concepts
2. **Key Findings**: Summarize main findings from the paper
3. **Literature Gaps**: Identify what's missing or needs more research
4. **Future Directions**: Suggest areas for future investigation

Format the response in markdown with clear sections.`;

  const systemPrompt = 'You are an expert academic researcher skilled at synthesizing literature and identifying research gaps.';
  
  return await callLLM(prompt, systemPrompt, 4096);
}

export async function refineLiteratureReview(existingReview, userPrompt) {
  const prompt = `Here is an existing literature review:

${existingReview}

User request: ${userPrompt}

Please refine the literature review based on the user's request. Maintain the markdown structure and improve the content accordingly.`;

  const systemPrompt = 'You are an expert academic researcher helping to refine and improve literature reviews.';
  
  return await callLLM(prompt, systemPrompt, 4096);
}

export async function generatePaperSummary(title, authors, year) {
  const prompt = `Provide a brief 2-3 sentence summary of what this research paper is likely about based on its title and authors:

Title: ${title}
Authors: ${authors}
Year: ${year}

Focus on the likely research area, methodology, and significance.`;

  const systemPrompt = 'You are an expert at understanding academic research papers.';
  
  return await callLLM(prompt, systemPrompt, 512);
}

// Export provider info
export function getProviderInfo() {
  try {
    const provider = getAvailableProvider();
    return {
      provider,
      available: true
    };
  } catch (error) {
    return {
      provider: 'none',
      available: false,
      error: error.message
    };
  }
}
