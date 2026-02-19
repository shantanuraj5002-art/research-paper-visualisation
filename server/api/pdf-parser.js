import pdf from 'pdf-parse';
import fs from 'fs/promises';

export async function extractPaperData(filePath) {
  try {
    const dataBuffer = await fs.readFile(filePath);
    const pdfData = await pdf(dataBuffer);
    
    const text = pdfData.text;
    
    // Extract title (usually first non-empty line or largest text)
    const lines = text.split('\n').filter(line => line.trim().length > 0);
    const title = lines[0]?.trim() || 'Untitled Paper';
    
    // Extract abstract (look for "Abstract" section)
    const abstractMatch = text.match(/abstract[:\s]+([\s\S]{100,2000}?)(?=\n\n|introduction|keywords|1\.|I\.)/i);
    const abstract = abstractMatch ? abstractMatch[1].trim() : '';
    
    // Extract authors (usually after title, before abstract)
    const authorMatch = text.match(/(?:by|authors?:?)\s*([^\n]{10,200})/i) || 
                       lines.slice(1, 5).join(' ').match(/([A-Z][a-z]+\s+[A-Z][a-z]+(?:,\s*[A-Z][a-z]+\s+[A-Z][a-z]+)*)/);
    const authors = authorMatch ? authorMatch[1].trim() : '';
    
    // Extract keywords
    const keywordsMatch = text.match(/keywords?[:\s]+([^\n]{10,200})/i);
    const keywords = keywordsMatch ? keywordsMatch[1].trim() : '';
    
    // Extract citations/references
    const referencesMatch = text.match(/(?:references|bibliography)[:\s]+([\s\S]{100,}?)(?=$|\n\n\n)/i);
    const citations = referencesMatch ? referencesMatch[1].trim() : '';
    
    // Extract conclusion
    const conclusionMatch = text.match(/(?:conclusion|discussion)[:\s]+([\s\S]{100,2000}?)(?=\n\n|references|acknowledgment)/i);
    const conclusion = conclusionMatch ? conclusionMatch[1].trim() : '';
    
    return {
      title,
      abstract,
      authors,
      keywords,
      bodyText: text,
      citations,
      conclusion,
      metadata: {
        pages: pdfData.numpages,
        info: pdfData.info
      }
    };
  } catch (error) {
    console.error('PDF parsing error:', error);
    throw new Error(`Failed to parse PDF: ${error.message}`);
  }
}

export function parseCitations(citationsText) {
  if (!citationsText) return [];
  
  // Split by common citation patterns
  const citations = citationsText
    .split(/\n(?=\[\d+\]|\d+\.|\[A-Z])/)
    .filter(c => c.trim().length > 20)
    .map((citation, index) => {
      // Extract year
      const yearMatch = citation.match(/\((\d{4})\)|\b(\d{4})\b/);
      const year = yearMatch ? yearMatch[1] || yearMatch[2] : '';
      
      // Extract title (usually in quotes or italics, or the longest part)
      const titleMatch = citation.match(/"([^"]{10,})"|'([^']{10,})'|[A-Z][^.]{20,}?\./);
      const title = titleMatch ? (titleMatch[1] || titleMatch[2] || titleMatch[0]).trim() : citation.substring(0, 100);
      
      // Extract authors (names before year)
      const authorMatch = citation.match(/^([^(]{5,}?)(?:\(|,\s*\d{4})/);
      const authors = authorMatch ? authorMatch[1].trim() : '';
      
      return {
        id: `ref-${index + 1}`,
        title: title.replace(/\.$/, ''),
        authors,
        year,
        rawText: citation.trim()
      };
    });
  
  return citations;
}
