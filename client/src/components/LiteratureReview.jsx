import { useState } from 'react';
import { generateLiteratureReview, refineLiteratureReview } from '../services/api';

function LiteratureReview({ paperId }) {
  const [topic, setTopic] = useState('');
  const [review, setReview] = useState(null);
  const [reviewId, setReviewId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refinePrompt, setRefinePrompt] = useState('');
  const [refining, setRefining] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    try {
      const result = await generateLiteratureReview(paperId, topic);
      setReview(result.content);
      setReviewId(result.reviewId);
    } catch (error) {
      console.error('Failed to generate review:', error);
      alert(`Error: ${error.response?.data?.error || error.message || 'Failed to generate literature review. Check console for details.'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRefine = async () => {
    if (!refinePrompt.trim() || !reviewId) return;

    setRefining(true);
    try {
      const result = await refineLiteratureReview(reviewId, refinePrompt);
      setReview(result.content);
      setRefinePrompt('');
    } catch (error) {
      console.error('Failed to refine review:', error);
    } finally {
      setRefining(false);
    }
  };

  const exportMarkdown = () => {
    const blob = new Blob([review], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'literature-review.md';
    link.click();
  };

  return (
    <div>
      {!review ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Research Topic
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Machine learning in healthcare"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <p className="text-sm text-gray-600">
            Generate a structured literature review with thematic groupings, key findings, gaps, and future directions.
          </p>

          <button
            onClick={handleGenerate}
            disabled={loading || !topic.trim()}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-300"
          >
            {loading ? 'Generating Review...' : 'Generate Literature Review'}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex gap-2">
            <button
              onClick={exportMarkdown}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
            >
              📥 Export Markdown
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: review
                  .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-6 mb-3">$1</h3>')
                  .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>')
                  .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
                  .replace(/^\*\*(.*)\*\*/gim, '<strong>$1</strong>')
                  .replace(/^- (.*$)/gim, '<li class="ml-4">$1</li>')
                  .replace(/\n\n/g, '</p><p class="mb-4">')
                  .replace(/^(?!<[h|l|p])/gim, '<p class="mb-4">')
              }}
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Refine Review</h4>
            <p className="text-sm text-blue-700 mb-3">
              Ask for specific changes or additions to the literature review
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={refinePrompt}
                onChange={(e) => setRefinePrompt(e.target.value)}
                placeholder="e.g., Add more details about methodology gaps"
                className="flex-1 px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleRefine}
                disabled={refining || !refinePrompt.trim()}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-300"
              >
                {refining ? 'Refining...' : 'Refine'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LiteratureReview;
