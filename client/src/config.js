// Application Configuration

export const config = {
  // Show/hide features in production
  production: {
    showSystemStatus: false,      // Hide "System Status" panel
    showPoweredByAI: false,        // Hide "Powered by AI" badge
    showDeveloperInfo: false,      // Hide developer information
    showFooterCredits: false,      // Hide "Made with ❤️" in footer
  },
  
  // Show/hide features in development
  development: {
    showSystemStatus: true,        // Show "System Status" panel
    showPoweredByAI: true,         // Show "Powered by AI" badge
    showDeveloperInfo: true,       // Show developer information
    showFooterCredits: true,       // Show "Made with ❤️" in footer
  },
  
  // Branding
  branding: {
    appName: 'Research Paper Analyzer',
    tagline: 'AI-powered insights for academic research',
    copyrightYear: new Date().getFullYear(),
    companyName: 'Your Company Name', // Change this to your company
  },
  
  // Features
  features: {
    dragAndDrop: true,
    visualAbstract: true,
    plainSummary: true,
    literatureReview: true,
    citationNetwork: true,
  }
};

// Helper function to get current environment config
export const getConfig = () => {
  const isDev = import.meta.env.DEV;
  return isDev ? config.development : config.production;
};

export default config;
