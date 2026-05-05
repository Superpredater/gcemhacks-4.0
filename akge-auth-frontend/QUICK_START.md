# AKGE Frontend - Quick Start Guide

## ⚡ 30-Second Setup

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser
# http://localhost:5173
```

## 🔐 Demo Credentials (Copy & Paste)

| Role | User ID | Password |
|------|---------|----------|
| 👨‍🎓 Student | `student1` | `1234` |
| 👨‍👩‍👧 Parent | `parent1` | `1234` |
| 👨‍🏫 Teacher | `teacher1` | `1234` |
| 👔 Management | `management1` | `1234` |
| ⚙️ Admin | `admin1` | `1234` |
| 💼 Investor | `investor1` | `1234` |
| 🏛️ Board | `board1` | `1234` |

**Tip**: Click demo account buttons on login page for instant access!

## 📁 Project Structure at a Glance

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
│   ├── Login.jsx
│   ├── Signup.jsx
│   └── dashboards/     # 7 role dashboards
├── store/              # Zustand auth store
├── App.jsx             # Main app with routing
└── index.css           # Global styles
```

## 🎯 Key Routes

| Route | Purpose |
|-------|---------|
| `/login` | Login page |
| `/signup` | Signup page |
| `/student/dashboard` | Student dashboard |
| `/parent/dashboard` | Parent dashboard |
| `/teacher/dashboard` | Teacher dashboard |
| `/management/dashboard` | Management dashboard |
| `/admin/dashboard` | Admin dashboard |
| `/investor/dashboard` | Investor dashboard |
| `/board/dashboard` | Board dashboard |

## 🛠️ Common Commands

```bash
# Development
npm run dev              # Start dev server

# Production
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint

# Troubleshooting
npm install              # Reinstall dependencies
npm cache clean --force  # Clear npm cache
```

## 🎨 Customization Quick Tips

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#your-color',
  secondary: '#your-color',
}
```

### Add New Dashboard
1. Create `src/pages/dashboards/NewRoleDashboard.jsx`
2. Add route in `src/App.jsx`
3. Add role to `authStore.js`

### Modify 3D Scene
Edit `src/components/ThreeScene.jsx`:
- Add/remove objects
- Change colors
- Adjust animations

## 🚀 Deployment

### Vercel (Easiest)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag 'dist' folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Push 'dist' to gh-pages branch
```

## 🐛 Quick Troubleshooting

### Port 5173 Already in Use
```bash
npm run dev -- --port 3000
```

### Dependencies Not Installing
```bash
rm -rf node_modules package-lock.json
npm install
```

### 3D Scene Not Showing
- Check browser console for errors
- Ensure WebGL is supported
- Try a different browser

### Styling Issues
```bash
npm run build
```

## 📱 Testing Checklist

- [ ] Login with demo account
- [ ] Signup with new account
- [ ] Logout works
- [ ] Role-based redirection works
- [ ] 3D background renders
- [ ] Responsive on mobile
- [ ] All dashboards load
- [ ] No console errors

## 💡 Pro Tips

1. **Quick Demo**: Click demo buttons instead of typing
2. **Responsive**: Test on mobile using DevTools (F12)
3. **Dark Mode**: Already built-in with dark theme
4. **Animations**: Smooth 300ms transitions throughout
5. **Accessibility**: Keyboard navigation supported

## 📚 Full Documentation

- `COMPLETE_SETUP.md` - Detailed setup guide
- `FRONTEND_SUMMARY.md` - Complete feature list
- `README.md` - Project overview

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [React Router](https://reactrouter.com)
- [Zustand](https://github.com/pmndrs/zustand)
- [Three.js](https://threejs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite](https://vitejs.dev)

## 🔗 Quick Links

- **Dev Server**: http://localhost:5173
- **Login Page**: http://localhost:5173/login
- **Signup Page**: http://localhost:5173/signup

## ✨ Features at a Glance

✅ 7 role-based dashboards  
✅ Modern glassmorphism design  
✅ 3D animated background  
✅ Fully responsive  
✅ Demo accounts included  
✅ Protected routes  
✅ Smooth animations  
✅ Production-ready code  

## 🎉 You're All Set!

Start the dev server and explore the platform. Click demo accounts to see different dashboards!

```bash
npm run dev
```

**Happy Learning! 🚀**

---

**Need Help?** Check `COMPLETE_SETUP.md` for detailed troubleshooting.
