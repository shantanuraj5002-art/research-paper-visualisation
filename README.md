# 🎓 Research Paper Visualization Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)

AI-powered research paper analysis and visualization platform with beautiful UI and multiple free LLM providers.

![Platform Screenshot](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Research+Paper+Analyzer)

## ✨ Features

- 📄 **PDF Upload & Processing** - Extract text, metadata, and citations from research papers
- 🎨 **Visual Abstract Generator** - AI-generated infographic summaries with D3.js
- 📝 **Plain-Language Summaries** - 6th-grade reading level explanations
- 📚 **Literature Review Assistant** - Automated review generation with iterative refinement
- 🔗 **Citation Network Visualization** - Interactive force-directed graphs
- 🎯 **Modern UI/UX** - Beautiful gradient design with drag & drop support
- 🆓 **Multiple Free LLM Providers** - Groq, Google Gemini, OpenAI support

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- API key from one of: [Groq](https://console.groq.com/) (recommended), [Google Gemini](https://aistudio.google.com/app/apikey), or [OpenAI](https://platform.openai.com/api-keys)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR-USERNAME/research-paper-analyzer.git
cd research-paper-analyzer
```

2. **Install dependencies**
```bash
npm install
cd client && npm install && cd ..
```

3. **Configure environment**
```bash
copy .env.example .env
```

Edit `.env` and add your API key:
```env
GROQ_API_KEY=gsk-your-key-here
# or
GOOGLE_API_KEY=your-key-here
# or
OPENAI_API_KEY=sk-your-key-here
```

4. **Initialize database**
```bash
npm run init-db
```

5. **Start the application**

**Windows (Easy):**
```bash
start.bat
```

**Manual:**
```bash
# Terminal 1 - Backend
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

6. **Open browser**
Navigate to http://localhost:5173

## 🔑 Getting Free API Keys

### Groq (Recommended - Fastest & Free)
1. Visit https://console.groq.com/
2. Sign up (no credit card required)
3. Create API key
4. Add to `.env`: `GROQ_API_KEY=gsk-...`

### Google Gemini (Free)
1. Visit https://aistudio.google.com/app/apikey
2. Sign in with Google
3. Create API key
4. Add to `.env`: `GOOGLE_API_KEY=...`

### OpenAI (Has $5 free credits)
1. Visit https://platform.openai.com/api-keys
2. Sign up
3. Create API key
4. Add to `.env`: `OPENAI_API_KEY=sk-...`

## 📖 Documentation

- [Setup Guide](FINAL-SETUP-GUIDE.md) - Detailed setup instructions
- [Deployment Guide](DEPLOYMENT-GUIDE.md) - Production deployment options
- [Customization Guide](CUSTOMIZATION-GUIDE.md) - Customize branding and features
- [GitHub Upload Guide](GITHUB-UPLOAD-GUIDE.md) - How to upload to GitHub safely
- [Free Alternatives](FREE-ALTERNATIVES.md) - All free LLM provider options
- [Troubleshooting](TROUBLESHOOTING.md) - Common issues and solutions

## 🛠️ Tech Stack

### Frontend
- React 18 with Vite
- Tailwind CSS for styling
- D3.js for visualizations
- Axios for API calls

### Backend
- Node.js with Express
- Multiple LLM providers (Groq, Gemini, OpenAI, Anthropic)
- PDF parsing with pdf-parse
- JSON-based file storage

### AI/ML
- Groq (Llama 3.3 70B) - Fastest
- Google Gemini - Free & reliable
- OpenAI GPT-4o-mini - High quality
- Anthropic Claude - Premium option

## 🎨 Features in Detail

### Visual Abstract Generation
Generate beautiful infographic-style summaries with:
- Key findings visualization
- Methodology overview
- Data points highlighting
- Conclusion summary
- Export as SVG/PNG

### Plain-Language Summaries
- Rewrites complex abstracts at 6th-grade reading level
- Side-by-side comparison with original
- Exportable as HTML share cards
- Perfect for public engagement

### Literature Review Assistant
- Automated thematic grouping
- Gap analysis
- Future directions suggestions
- Interactive refinement via chat
- Export as Markdown

### Citation Network
- Interactive force-directed graph
- Click nodes for AI-generated summaries
- Drag and zoom support
- Visual relationship mapping

## 📦 Production Deployment

### Build for Production
```bash
npm run build
```

### Deploy
```bash
npm start
```

The app serves both frontend and backend on port 3000 in production.

### Deployment Platforms
- Heroku
- Vercel
- Railway
- Docker
- VPS/Cloud servers

See [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md) for detailed instructions.

## 🎯 Usage

1. **Upload a PDF** - Drag & drop or click to browse
2. **Wait for processing** - Text extraction takes a few seconds
3. **Select a paper** - Click on it in your library
4. **Choose a feature:**
   - Visual Abstract - Generate infographic
   - Plain Summary - Get simplified version
   - Literature Review - Create structured review
   - Citation Network - Explore references

## 🔒 Security

- API keys stored in `.env` (never committed)
- File upload validation
- Rate limiting ready
- CORS configured
- Input sanitization

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Groq for fast, free LLM inference
- Google for Gemini API
- OpenAI for GPT models
- Anthropic for Claude
- D3.js for visualizations
- React and Vite teams

## 📧 Support

- 📖 Check [Documentation](FINAL-SETUP-GUIDE.md)
- 🐛 Report bugs via [Issues](https://github.com/YOUR-USERNAME/research-paper-analyzer/issues)
- 💬 Ask questions in [Discussions](https://github.com/YOUR-USERNAME/research-paper-analyzer/discussions)

## 🌟 Star History

If you find this project useful, please consider giving it a star! ⭐

---

**Made with ❤️ for researchers worldwide**
