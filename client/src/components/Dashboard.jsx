import { useState, useEffect } from 'react';
import { getPaper } from '../services/api';
import VisualAbstract from './VisualAbstract';
import PlainSummary from './PlainSummary';
import LiteratureReview from './LiteratureReview';
import CitationNetwork from './CitationNetwork';

function Dashboard({ paperId }) {
  const [paper, setPaper] = useState(null);
  const [activeTab, setActiveTab] = useState('visual');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPaper();
  }, [paperId]);

  const loadPaper = async () => {
    setLoading(true);
    try {
      const data = await getPaper(paperId);
      setPaper(data);
    } catch (error) {
      console.error('Failed to load paper:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 border border-gray-100">
        <div className="flex items-center justify-center">
          <svg className="animate-spin h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </div>
    );
  }

  if (!paper) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 border border-gray-100">
        <p className="text-red-500 text-center">Failed to load paper</p>
      </div>
    );
  }

  const tabs = [
    { 
      id: 'visual', 
      label: 'Visual Abstract', 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      ),
      color: 'blue'
    },
    { 
      id: 'summary', 
      label: 'Plain Summary', 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: 'purple'
    },
    { 
      id: 'review', 
      label: 'Literature Review', 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      color: 'green'
    },
    { 
      id: 'citations', 
      label: 'Citation Network', 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: 'orange'
    }
  ];

  const getTabColorClasses = (color, isActive) => {
    const colors = {
      blue: isActive ? 'border-blue-500 text-blue-600 bg-blue-50' : 'border-transparent text-gray-600 hover:text-blue-600 hover:bg-blue-50',
      purple: isActive ? 'border-purple-500 text-purple-600 bg-purple-50' : 'border-transparent text-gray-600 hover:text-purple-600 hover:bg-purple-50',
      green: isActive ? 'border-green-500 text-green-600 bg-green-50' : 'border-transparent text-gray-600 hover:text-green-600 hover:bg-green-50',
      orange: isActive ? 'border-orange-500 text-orange-600 bg-orange-50' : 'border-transparent text-gray-600 hover:text-orange-600 hover:bg-orange-50',
    };
    return colors[color];
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Paper Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">{paper.title}</h2>
        {paper.authors && (
          <p className="text-blue-100 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {paper.authors}
          </p>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 bg-gray-50">
        <nav className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium text-sm transition-all whitespace-nowrap ${
                getTabColorClasses(tab.color, activeTab === tab.id)
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'visual' && <VisualAbstract paperId={paperId} />}
        {activeTab === 'summary' && <PlainSummary paperId={paperId} paper={paper} />}
        {activeTab === 'review' && <LiteratureReview paperId={paperId} />}
        {activeTab === 'citations' && <CitationNetwork paperId={paperId} />}
      </div>
    </div>
  );
}

export default Dashboard;
