import axios from 'axios';

const API_BASE = '/api';

export const uploadPaper = async (file) => {
  const formData = new FormData();
  formData.append('paper', file);
  const response = await axios.post(`${API_BASE}/upload`, formData);
  return response.data;
};

export const getPapers = async () => {
  const response = await axios.get(`${API_BASE}/papers`);
  return response.data;
};

export const getPaper = async (id) => {
  const response = await axios.get(`${API_BASE}/papers/${id}`);
  return response.data;
};

export const generateVisualAbstract = async (paperId) => {
  const response = await axios.post(`${API_BASE}/papers/${paperId}/visual-abstract`);
  return response.data;
};

export const generatePlainSummary = async (paperId) => {
  const response = await axios.post(`${API_BASE}/papers/${paperId}/plain-summary`);
  return response.data;
};

export const generateLiteratureReview = async (paperId, topic) => {
  const response = await axios.post(`${API_BASE}/literature-review`, { paperId, topic });
  return response.data;
};

export const refineLiteratureReview = async (reviewId, prompt) => {
  const response = await axios.post(`${API_BASE}/literature-review/${reviewId}/refine`, { prompt });
  return response.data;
};

export const getCitationNetwork = async (paperId) => {
  const response = await axios.get(`${API_BASE}/papers/${paperId}/citations`);
  return response.data;
};

export const getCitationSummary = async (title, authors, year) => {
  const response = await axios.post(`${API_BASE}/citation-summary`, { title, authors, year });
  return response.data;
};
