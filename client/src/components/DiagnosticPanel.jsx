import { useState, useEffect } from 'react';
import axios from 'axios';

function DiagnosticPanel() {
  const [config, setConfig] = useState(null);
  const [backendStatus, setBackendStatus] = useState('checking');

  useEffect(() => {
    checkBackend();
  }, []);

  const checkBackend = async () => {
    try {
      const response = await axios.get('/api/check-config');
      setConfig(response.data);
      setBackendStatus('connected');
    } catch (error) {
      setBackendStatus('error');
      console.error('Backend check failed:', error);
    }
  };

  if (backendStatus === 'checking') {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
        <p className="text-yellow-800">Checking backend connection...</p>
      </div>
    );
  }

  if (backendStatus === 'error') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
        <h3 className="font-semibold text-red-900 mb-2">❌ Backend Not Connected</h3>
        <p className="text-red-800 text-sm mb-2">
          Cannot connect to the backend server. Make sure it's running on port 3000.
        </p>
        <p className="text-red-700 text-sm font-mono">
          Run: npm run dev
        </p>
      </div>
    );
  }

  return (
    <div className={`border-2 rounded-xl p-4 mb-6 ${config?.hasApiKey ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300' : 'bg-gradient-to-r from-red-50 to-orange-50 border-red-300'}`}>
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-900 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          System Status
        </h3>
        <button
          onClick={checkBackend}
          className="text-xs px-3 py-1 bg-white rounded-full hover:bg-gray-100 transition-colors border border-gray-300"
        >
          Refresh
        </button>
      </div>
      <div className="mt-3 space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-lg">{backendStatus === 'connected' ? '✅' : '❌'}</span>
          <span className="font-medium">Backend:</span>
          <span className={backendStatus === 'connected' ? 'text-green-700' : 'text-red-700'}>
            {backendStatus}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg">{config?.hasApiKey ? '✅' : '❌'}</span>
          <span className="font-medium">API Key:</span>
          <span className={config?.hasApiKey ? 'text-green-700' : 'text-red-700'}>
            {config?.hasApiKey ? 'Configured' : 'NOT SET'}
          </span>
        </div>
        {config?.hasApiKey && (
          <>
            <div className="flex items-center gap-2 text-xs text-gray-600 ml-8">
              <span className="font-medium">Provider:</span>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-semibold">
                {config.provider}
              </span>
            </div>
            <div className="text-xs text-gray-600 ml-8">
              Key: <code className="bg-white px-2 py-0.5 rounded">{config.apiKeyPrefix}</code>
            </div>
          </>
        )}
        {!config?.hasApiKey && (
          <div className="mt-3 p-3 bg-white rounded-lg border-2 border-red-200 text-xs">
            <div className="font-bold text-red-900 mb-2 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Action Required
            </div>
            <p className="mb-2">Add an API key to your .env file</p>
            <div className="bg-blue-50 p-2 rounded border border-blue-200 mb-2">
              <p className="font-semibold text-blue-900">🚀 Best FREE Option: Groq</p>
              <p className="text-blue-700">Fast, reliable, and completely free!</p>
              <a 
                href="https://console.groq.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 underline font-semibold hover:text-blue-800"
              >
                Get key at console.groq.com →
              </a>
            </div>
            <code className="block bg-gray-100 p-2 rounded text-xs">
              GROQ_API_KEY=gsk-your-key-here
            </code>
            <p className="text-gray-600 mt-2">
              Alternative: <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline">Google Gemini</a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DiagnosticPanel;
