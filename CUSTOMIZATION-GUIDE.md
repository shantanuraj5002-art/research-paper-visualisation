# 🎨 Customization Guide

## Hide/Show Features in Production

The app automatically hides certain elements when deployed in production mode.

### What's Hidden in Production by Default:

1. ❌ "System Status" panel (shows API key, provider info)
2. ❌ "Powered by AI" badge in header
3. ❌ "Made with ❤️" in footer

### What Shows in Production:

1. ✅ Clean professional interface
2. ✅ Company name and copyright
3. ✅ All core features (upload, analysis, etc.)

## Customize Production Appearance

Edit `client/src/config.js` to control what shows:

```javascript
export const config = {
  // Production settings
  production: {
    showSystemStatus: false,      // Set to true to show status panel
    showPoweredByAI: false,        // Set to true to show AI badge
    showDeveloperInfo: false,      // Developer information
    showFooterCredits: false,      // "Made with ❤️" message
  },
  
  // Branding
  branding: {
    appName: 'Research Paper Analyzer',
    tagline: 'AI-powered insights for academic research',
    copyrightYear: new Date().getFullYear(),
    companyName: 'Your Company Name', // ← Change this!
  },
};
```

## Common Customizations

### 1. Change Company Name

Edit `client/src/config.js`:
```javascript
branding: {
  companyName: 'Acme Research Inc.',
}
```

Footer will show: "© 2024 Acme Research Inc. • All rights reserved"

### 2. Change App Name

```javascript
branding: {
  appName: 'Academic Paper Insights',
  tagline: 'Your custom tagline here',
}
```

### 3. Show System Status in Production

If you want to show the status panel even in production:

```javascript
production: {
  showSystemStatus: true,  // Now visible in production
}
```

### 4. Show "Powered by AI" Badge

```javascript
production: {
  showPoweredByAI: true,  // Badge appears in production
}
```

### 5. Custom Footer Message

```javascript
production: {
  showFooterCredits: true,  // Shows "Made with ❤️" message
}
```

## Development vs Production

### Development Mode (npm run dev)
- Shows everything (status panel, badges, credits)
- Helpful for debugging
- Full transparency

### Production Mode (npm start)
- Clean professional interface
- Hides technical details
- Shows company branding

## Testing Production Appearance

### Option 1: Build and Preview

```powershell
# Build for production
npm run build

# Preview the build
cd client
npm run preview
```

### Option 2: Set NODE_ENV

Edit `.env`:
```
NODE_ENV=production
```

Then run:
```powershell
npm run dev
```

## Branding Checklist

Before deploying, customize these:

- [ ] Company name in `config.js`
- [ ] App name and tagline
- [ ] Copyright year (auto-updates)
- [ ] Decide what to show/hide
- [ ] Test production build
- [ ] Update README with your info

## Advanced Customization

### Change Colors

Edit `client/src/App.jsx` and component files:

```javascript
// Current: Blue/Indigo gradient
className="bg-gradient-to-r from-blue-600 to-indigo-600"

// Change to: Purple/Pink
className="bg-gradient-to-r from-purple-600 to-pink-600"

// Change to: Green/Teal
className="bg-gradient-to-r from-green-600 to-teal-600"
```

### Change Logo

Replace the SVG icon in `client/src/App.jsx`:

```javascript
<div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
  {/* Replace this SVG with your logo */}
  <svg>...</svg>
</div>
```

Or use an image:
```javascript
<img src="/logo.png" alt="Logo" className="w-12 h-12" />
```

### Add Custom Features

Edit `client/src/config.js`:

```javascript
features: {
  dragAndDrop: true,
  visualAbstract: true,
  plainSummary: true,
  literatureReview: true,
  citationNetwork: true,
  // Add your custom features
  customFeature: true,
}
```

## Environment Variables

You can also control features via environment variables.

Create `client/.env.production`:
```
VITE_SHOW_STATUS=false
VITE_SHOW_AI_BADGE=false
VITE_COMPANY_NAME=Your Company
```

Then use in code:
```javascript
const showStatus = import.meta.env.VITE_SHOW_STATUS === 'true';
```

## Quick Reference

| Setting | Development | Production |
|---------|-------------|------------|
| System Status | ✅ Shown | ❌ Hidden |
| AI Badge | ✅ Shown | ❌ Hidden |
| Footer Credits | ✅ Shown | ❌ Hidden |
| Company Name | N/A | ✅ Shown |
| Copyright | N/A | ✅ Shown |

## Need Help?

- Check `client/src/config.js` for all options
- See `client/src/App.jsx` for implementation
- Test with `npm run build` before deploying

---

**Remember:** After changing `config.js`, rebuild for production:
```powershell
npm run build
```
