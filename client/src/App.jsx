import { useState, useEffect } from 'react';
import PaperUpload from './components/PaperUpload';
import PaperList from './components/PaperList';
import Dashboard from './components/Dashboard';
import DiagnosticPanel from './components/DiagnosticPanel';
import { getPapers } from './services/api';
import { config, getConfig } from './config';

function App() {
  const [papers, setPapers] = useState([]);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const envConfig = getConfig();

  useEffect(() => {
    loadPapers();
  }, []);

  const loadPapers = async () => {
    try {
      const data = await getPapers();
      setPapers(data);
    } catch (error) {
      console.error('Failed to load papers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = () => {
    loadPapers();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {config.branding.appName}
                </h1>
                <p className="text-sm text-gray-600">{config.branding.tagline}</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm">
              {envConfig.showPoweredByAI && (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                  ⚡ Powered by AI
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Only show diagnostic panel based on config */}
        {envConfig.showSystemStatus && <DiagnosticPanel />}
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <PaperUpload onUploadSuccess={handleUploadSuccess} />
            <PaperList 
              papers={papers} 
              selectedPaper={selectedPaper}
              onSelectPaper={setSelectedPaper}
              loading={loading}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {selectedPaper ? (
              <Dashboard paperId={selectedPaper} />
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Started</h3>
                  <p className="text-gray-600 mb-6">
                    Upload a research paper or select one from your library to unlock AI-powered analysis and visualization
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-semibold text-blue-900">📊 Visual Abstracts</div>
                      <div className="text-blue-700 text-xs mt-1">Infographic summaries</div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="font-semibold text-purple-900">📝 Plain Summaries</div>
                      <div className="text-purple-700 text-xs mt-1">Easy to understand</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-semibold text-green-900">📚 Reviews</div>
                      <div className="text-green-700 text-xs mt-1">Literature analysis</div>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <div className="font-semibold text-orange-900">🔗 Networks</div>
                      <div className="text-orange-700 text-xs mt-1">Citation graphs</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          {envConfig.showFooterCredits ? (
            <p>{config.branding.appName} • Powered by AI • Made with ❤️ for researchers</p>
          ) : (
            <p>{config.branding.appName} • © {config.branding.copyrightYear} {config.branding.companyName} • All rights reserved</p>
          )}
        </div>
      </footer>
    </div>
  );
}

export default App;
