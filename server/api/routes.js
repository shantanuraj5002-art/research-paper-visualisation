import express from 'express';
import multer from 'multer';
import { extractPaperData, parseCitations } from './pdf-parser.js';
import { 
  generateVisualAbstract, 
  generatePlainSummary, 
  generateLiteratureReview,
  refineLiteratureReview,
  generatePaperSummary 
} from './llm.js';
import db from '../db/database.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = join(__dirname, '../../uploads');
    await fs.mkdir(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});

// Upload and process PDF
router.post('/upload', upload.single('paper'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const paperData = await extractPaperData(req.file.path);
    
    const paperId = await db.insertPaper({
      filename: req.file.originalname,
      title: paperData.title,
      abstract: paperData.abstract,
      authors: paperData.authors,
      keywords: paperData.keywords,
      body_text: paperData.bodyText,
      citations: paperData.citations
    });

    res.json({
      paperId,
      ...paperData
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all papers
router.get('/papers', async (req, res) => {
  try {
    const papers = await db.getAllPapers();
    res.json(papers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get paper details
router.get('/papers/:id', async (req, res) => {
  try {
    const paper = await db.getPaperById(req.params.id);
    if (!paper) {
      return res.status(404).json({ error: 'Paper not found' });
    }
    res.json(paper);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate visual abstract
router.post('/papers/:id/visual-abstract', async (req, res) => {
  try {
    const paper = await db.getPaperById(req.params.id);
    if (!paper) {
      return res.status(404).json({ error: 'Paper not found' });
    }

    const keyFindings = paper.body_text.substring(0, 2000);
    const visualAbstract = await generateVisualAbstract(paper.abstract, keyFindings);
    
    // Store in database
    await db.upsertSummary(req.params.id, {
      visual_abstract: JSON.stringify(visualAbstract)
    });

    res.json(visualAbstract);
  } catch (error) {
    console.error('Visual abstract error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Generate plain summary
router.post('/papers/:id/plain-summary', async (req, res) => {
  try {
    const paper = await db.getPaperById(req.params.id);
    if (!paper) {
      return res.status(404).json({ error: 'Paper not found' });
    }

    const conclusionMatch = paper.body_text.match(/(?:conclusion|discussion)[:\s]+([\s\S]{100,2000}?)(?=\n\n|references)/i);
    const conclusion = conclusionMatch ? conclusionMatch[1] : paper.body_text.substring(paper.body_text.length - 1000);

    const plainSummary = await generatePlainSummary(paper.abstract, conclusion);
    
    // Store in database
    await db.upsertSummary(req.params.id, {
      plain_summary: plainSummary
    });

    res.json({ summary: plainSummary, original: paper.abstract });
  } catch (error) {
    console.error('Plain summary error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Generate literature review
router.post('/literature-review', async (req, res) => {
  try {
    const { paperId, topic } = req.body;
    
    let paperContent = '';
    if (paperId) {
      const paper = await db.getPaperById(paperId);
      if (paper) {
        paperContent = paper.body_text;
      }
    }

    const review = await generateLiteratureReview(paperContent, topic);
    
    const reviewId = await db.insertLiteratureReview({
      paper_id: paperId || null,
      topic,
      review_content: review
    });

    res.json({ reviewId, content: review });
  } catch (error) {
    console.error('Literature review error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Refine literature review
router.post('/literature-review/:id/refine', async (req, res) => {
  try {
    const { prompt } = req.body;
    const review = await db.getLiteratureReviewById(req.params.id);
    
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    const refinedReview = await refineLiteratureReview(review.review_content, prompt);
    
    await db.updateLiteratureReview(req.params.id, refinedReview);

    res.json({ content: refinedReview });
  } catch (error) {
    console.error('Refine review error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get citation network
router.get('/papers/:id/citations', async (req, res) => {
  try {
    const paper = await db.getPaperById(req.params.id);
    if (!paper) {
      return res.status(404).json({ error: 'Paper not found' });
    }

    const citations = parseCitations(paper.citations);
    
    // Build graph structure
    const nodes = [
      { id: `paper-${req.params.id}`, label: paper.title, type: 'main' },
      ...citations.map(c => ({ id: c.id, label: c.title, type: 'citation', ...c }))
    ];
    
    const edges = citations.map(c => ({
      source: `paper-${req.params.id}`,
      target: c.id
    }));

    res.json({ nodes, edges });
  } catch (error) {
    console.error('Citations error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get paper summary for citation node
router.post('/citation-summary', async (req, res) => {
  try {
    const { title, authors, year } = req.body;
    const summary = await generatePaperSummary(title, authors, year);
    res.json({ summary });
  } catch (error) {
    console.error('Citation summary error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
