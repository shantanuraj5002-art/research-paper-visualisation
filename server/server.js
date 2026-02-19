import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './db/database.js';
import routes from './api/routes.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize database
await db.initDatabase();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', routes);

// Serve static files from React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '../client/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../client/dist/index.html'));
  });
}

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// API key check endpoint
app.get('/api/check-config', (req, res) => {
  const hasAnthropicKey = !!process.env.ANTHROPIC_API_KEY;
  const hasGoogleKey = !!process.env.GOOGLE_API_KEY;
  const hasOpenAIKey = !!process.env.OPENAI_API_KEY;
  const hasGroqKey = !!process.env.GROQ_API_KEY;
  
  let provider = 'none';
  let apiKeyPrefix = 'NOT SET';
  
  if (process.env.LLM_PROVIDER && process.env.LLM_PROVIDER !== 'auto') {
    provider = process.env.LLM_PROVIDER;
  } else if (hasGroqKey) {
    provider = 'groq';
    apiKeyPrefix = process.env.GROQ_API_KEY.substring(0, 10) + '...';
  } else if (hasGoogleKey) {
    provider = 'gemini';
    apiKeyPrefix = process.env.GOOGLE_API_KEY.substring(0, 10) + '...';
  } else if (hasOpenAIKey) {
    provider = 'openai';
    apiKeyPrefix = process.env.OPENAI_API_KEY.substring(0, 10) + '...';
  } else if (hasAnthropicKey) {
    provider = 'anthropic';
    apiKeyPrefix = process.env.ANTHROPIC_API_KEY.substring(0, 10) + '...';
  }
  
  res.json({
    hasApiKey: hasGroqKey || hasGoogleKey || hasOpenAIKey || hasAnthropicKey,
    provider,
    apiKeyPrefix,
    availableProviders: {
      groq: hasGroqKey,
      gemini: hasGoogleKey,
      openai: hasOpenAIKey,
      anthropic: hasAnthropicKey
    },
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT || 3000
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
