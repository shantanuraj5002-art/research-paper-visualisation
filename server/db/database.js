import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DB_PATH = join(__dirname, '../../data.json');

// In-memory cache
let db = {
  papers: [],
  summaries: [],
  literatureReviews: []
};

// Load database from file
async function loadDB() {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    db = JSON.parse(data);
  } catch (error) {
    // File doesn't exist yet, use empty db
    db = {
      papers: [],
      summaries: [],
      literatureReviews: []
    };
  }
}

// Save database to file
async function saveDB() {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
}

// Initialize database
export async function initDatabase() {
  await loadDB();
  console.log('Database initialized');
}

// Paper operations
export async function insertPaper(paperData) {
  await loadDB();
  const id = db.papers.length > 0 ? Math.max(...db.papers.map(p => p.id)) + 1 : 1;
  const paper = {
    id,
    ...paperData,
    upload_date: new Date().toISOString()
  };
  db.papers.push(paper);
  await saveDB();
  return id;
}

export async function getAllPapers() {
  await loadDB();
  return db.papers.map(p => ({
    id: p.id,
    filename: p.filename,
    title: p.title,
    authors: p.authors,
    upload_date: p.upload_date
  }));
}

export async function getPaperById(id) {
  await loadDB();
  return db.papers.find(p => p.id === parseInt(id));
}

// Summary operations
export async function upsertSummary(paperId, summaryData) {
  await loadDB();
  const existingIndex = db.summaries.findIndex(s => s.paper_id === parseInt(paperId));
  
  if (existingIndex >= 0) {
    db.summaries[existingIndex] = {
      ...db.summaries[existingIndex],
      ...summaryData,
      paper_id: parseInt(paperId)
    };
  } else {
    const id = db.summaries.length > 0 ? Math.max(...db.summaries.map(s => s.id)) + 1 : 1;
    db.summaries.push({
      id,
      paper_id: parseInt(paperId),
      ...summaryData,
      created_at: new Date().toISOString()
    });
  }
  
  await saveDB();
}

export async function getSummaryByPaperId(paperId) {
  await loadDB();
  return db.summaries.find(s => s.paper_id === parseInt(paperId));
}

// Literature review operations
export async function insertLiteratureReview(reviewData) {
  await loadDB();
  const id = db.literatureReviews.length > 0 ? Math.max(...db.literatureReviews.map(r => r.id)) + 1 : 1;
  const review = {
    id,
    ...reviewData,
    created_at: new Date().toISOString()
  };
  db.literatureReviews.push(review);
  await saveDB();
  return id;
}

export async function updateLiteratureReview(id, content) {
  await loadDB();
  const review = db.literatureReviews.find(r => r.id === parseInt(id));
  if (review) {
    review.review_content = content;
    await saveDB();
  }
}

export async function getLiteratureReviewById(id) {
  await loadDB();
  return db.literatureReviews.find(r => r.id === parseInt(id));
}

export default {
  initDatabase,
  insertPaper,
  getAllPapers,
  getPaperById,
  upsertSummary,
  getSummaryByPaperId,
  insertLiteratureReview,
  updateLiteratureReview,
  getLiteratureReviewById
};
