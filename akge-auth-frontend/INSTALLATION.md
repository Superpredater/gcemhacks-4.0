# Installation & Deployment Guide

## 🖥️ System Requirements

- **Node.js**: 16.0.0 or higher
- **npm**: 7.0.0 or higher (or yarn 1.22.0+)
- **Browser**: Modern browser with WebGL support (Chrome, Firefox, Safari, Edge)
- **RAM**: Minimum 2GB
- **Disk Space**: ~500MB for node_modules

## 📥 Installation Steps

### Step 1: Clone or Download Project

```bash
# If using git
git clone <repository-url>
cd akge-auth-frontend

# Or navigate to the project directory if already downloaded
cd akge-auth-frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages:
- React & React DOM
- React Router DOM
- Zustand
- Three.js & React Three Fiber
- Tailwind CSS
- Vite
- And other dependencies

**Installation time**: 2-5 minutes depending on internet speed

### Step 3: Verify Installation

```bash
npm list
```

Should show all packages installed successfully.

### Step 4: Start Development Server

```bash
npm run dev
```

Expected output:
```
  VITE v5.0.0  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### Step 5: Open in Browser

- Automatically opens at `http://localhost:5173`
- Or manually navigate to the URL

## 🔑 First Login

1. **Page loads** → You see the login page with 3D background
2. **Enter credentials**:
   - User ID: `student1`
   - Password: `1234`
   - Role: Select "Student"
3. **Click Sign In** → Loading animation appears
4. **Dashboard loads** → You see the Student Dashboard

## 🚀 Production Build

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

**Build output**:
```
dist/
├── index.html
├── assets/
│   ├── index-xxxxx.js
│   └── index-xxxxx.css
└── vite.svg
```

### Preview Production Build

```bash
npm run preview
```

Opens the production build locally for testing.

### Deploy to Production

#### Option 1: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Option 2: Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

#### Option 3: GitHub Pages

```bash
# Update vite.config.js
export default {
  base: '/akge-auth-frontend/',
  // ... rest of config
}

# Build
npm run build

# Deploy dist folder to gh-pages branch
```

#### Option 4: Traditional Hosting

1. Run `npm run build`
2. Upload `dist` folder to your hosting provider
3. Configure server to serve `index.html` for all routes
4. Set environment variables if needed

## 🔧 Configuration

### Environment Variables

Create `.env.local` file:

```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=AKGE
VITE_APP_VERSION=1.0.0
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL
```

### Vite Configuration

Edit `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
```

### Tailwind Configuration

Edit `tailwind.config.js` to customize:
- Colors
- Fonts
- Spacing
- Breakpoints
- Animations

## 📦 Dependency Management

### Update Dependencies

```bash
# Check for updates
npm outdated

# Update all packages
npm update

# Update specific package
npm install package-name@latest
```

### Add New Package

```bash
npm install package-name
```

### Remove Package

```bash
npm uninstall package-name
```

## 🐛 Troubleshooting

### Issue: Port 5173 Already in Use

**Solution**:
```bash
npm run dev -- --port 3000
```

### Issue: Module Not Found

**Solution**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: 3D Scene Not Rendering

**Solution**:
1. Check browser WebGL support: https://get.webgl.org/
2. Update graphics drivers
3. Try different browser
4. Check browser console for errors

### Issue: Styles Not Applying

**Solution**:
```bash
# Rebuild Tailwind CSS
npm run dev

# Or clear cache
rm -rf .vite
npm run dev
```

### Issue: Build Fails

**Solution**:
```bash
# Check for errors
npm run build -- --debug

# Clear cache and rebuild
rm -rf dist node_modules
npm install
npm run build
```

## 🔍 Debugging

### Enable Debug Mode

```bash
# In terminal
DEBUG=* npm run dev
```

### Browser DevTools

1. **Open DevTools**: F12 or Right-click → Inspect
2. **Console Tab**: Check for errors
3. **Network Tab**: Monitor API calls
4. **React DevTools**: Install browser extension
5. **Performance Tab**: Profile performance

### Check localStorage

```javascript
// In browser console
localStorage.getItem('user')
```

## 📊 Performance Optimization

### Bundle Analysis

```bash
npm install -g vite-plugin-visualizer
```

### Lighthouse Audit

1. Open DevTools
2. Go to Lighthouse tab
3. Click "Analyze page load"

### Optimize Images

- Use WebP format
- Compress images
- Use appropriate sizes

## 🔐 Security Checklist

- [ ] Remove demo credentials in production
- [ ] Use HTTPS only
- [ ] Set secure cookies
- [ ] Implement CORS properly
- [ ] Validate all inputs
- [ ] Use environment variables for secrets
- [ ] Enable CSP headers
- [ ] Regular security updates

## 📈 Monitoring

### Setup Error Tracking

```javascript
// Example with Sentry
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_DSN",
  environment: "production"
});
```

### Setup Analytics

```javascript
// Example with Google Analytics
import ReactGA from 'react-ga4';

ReactGA.initialize('GA_MEASUREMENT_ID');
```

## 🚀 Deployment Checklist

- [ ] Run `npm run build` successfully
- [ ] Test production build locally
- [ ] Update environment variables
- [ ] Configure domain/DNS
- [ ] Setup SSL certificate
- [ ] Configure CDN if needed
- [ ] Setup monitoring
- [ ] Setup error tracking
- [ ] Configure backups
- [ ] Document deployment process

## 📝 Maintenance

### Regular Updates

```bash
# Check for security vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Update packages
npm update
```

### Backup Strategy

- Backup source code to Git
- Backup database regularly
- Backup environment variables
- Document all configurations

### Monitoring

- Monitor error rates
- Monitor performance metrics
- Monitor user activity
- Monitor server resources

## 🆘 Getting Help

### Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Three.js Documentation](https://threejs.org)
- [Zustand GitHub](https://github.com/pmndrs/zustand)

### Support Channels

1. Check README.md
2. Review component comments
3. Check browser console
4. Search GitHub issues
5. Ask in community forums

## 📞 Contact

For issues or questions:
- Open GitHub issue
- Contact development team
- Check documentation

---

## Quick Reference

### Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run preview         # Preview production build

# Maintenance
npm install             # Install dependencies
npm update              # Update packages
npm audit               # Check vulnerabilities
npm audit fix           # Fix vulnerabilities

# Debugging
npm run dev -- --debug  # Debug mode
npm run build -- --debug # Debug build
```

### File Locations

- **Source Code**: `src/`
- **Build Output**: `dist/`
- **Configuration**: `vite.config.js`, `tailwind.config.js`
- **Dependencies**: `node_modules/`
- **Environment**: `.env.local`

### Important Files

- `package.json` - Dependencies & scripts
- `vite.config.js` - Vite configuration
- `tailwind.config.js` - Tailwind configuration
- `src/App.jsx` - Main app component
- `src/store/authStore.js` - Auth state

---

**Installation Complete! 🎉**

You're now ready to use the AKGE Authentication Frontend. Start with `npm run dev` and explore the application!
