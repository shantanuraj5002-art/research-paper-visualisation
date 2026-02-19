# 🔄 Production vs Development Mode

## Quick Comparison

### Development Mode (npm run dev)
```
┌─────────────────────────────────────────┐
│ Research Paper Analyzer                 │
│ AI-powered insights                     │  ⚡ Powered by AI
├─────────────────────────────────────────┤
│                                         │
│ ✅ System Status            [Refresh]   │
│ ✅ Backend: connected                   │
│ ✅ API Key: Configured                  │
│    Provider: groq                       │
│    Key: gsk_R1z2k...                    │
│                                         │
├─────────────────────────────────────────┤
│ [Upload Paper]  [Your Library]          │
│                                         │
│ [Paper content and features]            │
│                                         │
└─────────────────────────────────────────┘
Footer: Made with ❤️ for researchers
```

### Production Mode (npm start)
```
┌─────────────────────────────────────────┐
│ Research Paper Analyzer                 │
│ AI-powered insights                     │
├─────────────────────────────────────────┤
│                                         │
│ [Upload Paper]  [Your Library]          │
│                                         │
│ [Paper content and features]            │
│                                         │
│                                         │
│                                         │
└─────────────────────────────────────────┘
Footer: © 2024 Your Company • All rights reserved
```

## What Changes?

### Hidden in Production ❌

1. **System Status Panel**
   - Backend connection status
   - API key information
   - Provider details
   - Key prefix display

2. **"Powered by AI" Badge**
   - Green badge in header
   - Removed for cleaner look

3. **Developer Credits**
   - "Made with ❤️" message
   - Replaced with copyright

### Shown in Production ✅

1. **Professional Footer**
   - Company name
   - Copyright year
   - "All rights reserved"

2. **Clean Interface**
   - No technical details
   - No debug information
   - Professional appearance

3. **All Core Features**
   - Upload functionality
   - Paper library
   - Visual abstracts
   - Plain summaries
   - Literature reviews
   - Citation networks

## Why Hide These Elements?

### System Status Panel
- **Development:** Helpful for debugging API issues
- **Production:** Users don't need to see technical details
- **Security:** Hides API provider information

### "Powered by AI" Badge
- **Development:** Shows AI capabilities clearly
- **Production:** Cleaner, more professional look
- **Branding:** Focus on your company, not the tech

### Developer Credits
- **Development:** Shows it's a development build
- **Production:** Professional copyright notice
- **Legal:** Proper attribution and rights

## How to Test Both Modes

### Test Development Mode
```powershell
npm run dev
```
Opens: http://localhost:5173
Shows: All debug info

### Test Production Mode

**Option 1: Build and preview**
```powershell
npm run build
cd client
npm run preview
```

**Option 2: Production server**
```powershell
# Set NODE_ENV=production in .env
npm start
```
Opens: http://localhost:3000
Shows: Clean production interface

## Switching Between Modes

### Force Development Features in Production

Edit `client/src/config.js`:
```javascript
production: {
  showSystemStatus: true,    // Show status panel
  showPoweredByAI: true,     // Show AI badge
  showFooterCredits: true,   // Show credits
}
```

### Force Production Look in Development

Edit `client/src/config.js`:
```javascript
development: {
  showSystemStatus: false,   // Hide status panel
  showPoweredByAI: false,    // Hide AI badge
  showFooterCredits: false,  // Hide credits
}
```

## Customization Examples

### Example 1: Show Everything (Debug Mode)
```javascript
production: {
  showSystemStatus: true,
  showPoweredByAI: true,
  showDeveloperInfo: true,
  showFooterCredits: true,
}
```

### Example 2: Minimal Clean (Corporate)
```javascript
production: {
  showSystemStatus: false,
  showPoweredByAI: false,
  showDeveloperInfo: false,
  showFooterCredits: false,
}
branding: {
  companyName: 'Acme Corp',
}
```

### Example 3: Show AI Badge Only
```javascript
production: {
  showSystemStatus: false,
  showPoweredByAI: true,     // Keep this!
  showDeveloperInfo: false,
  showFooterCredits: false,
}
```

## Feature Comparison Table

| Feature | Development | Production | Customizable |
|---------|-------------|------------|--------------|
| System Status Panel | ✅ | ❌ | ✅ |
| Backend Status | ✅ | ❌ | ✅ |
| API Key Display | ✅ | ❌ | ✅ |
| Provider Info | ✅ | ❌ | ✅ |
| "Powered by AI" Badge | ✅ | ❌ | ✅ |
| Developer Credits | ✅ | ❌ | ✅ |
| Company Name | ❌ | ✅ | ✅ |
| Copyright Notice | ❌ | ✅ | ✅ |
| Upload Feature | ✅ | ✅ | ✅ |
| Paper Library | ✅ | ✅ | ✅ |
| All Analysis Tools | ✅ | ✅ | ✅ |

## Best Practices

### For Development
- Keep all debug features enabled
- Use System Status to verify API setup
- Monitor backend connection
- Check provider information

### For Production
- Hide technical details
- Show professional branding
- Use company name in footer
- Keep interface clean

### For Demos
- Consider showing "Powered by AI" badge
- Hide System Status panel
- Use professional footer
- Emphasize features, not tech

## Environment Detection

The app automatically detects the environment:

```javascript
// Vite automatically sets this
import.meta.env.DEV   // true in development
import.meta.env.PROD  // true in production
```

You can override in `config.js` for custom behavior.

## Quick Commands

```powershell
# Development with all features
npm run dev

# Build for production
npm run build

# Test production build
npm start

# Preview production build
cd client && npm run preview
```

---

**Summary:**
- Development = Full transparency + debug info
- Production = Clean interface + professional branding
- Fully customizable via `client/src/config.js`
