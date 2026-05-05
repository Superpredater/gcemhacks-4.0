# Quick Setup Guide

## Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

## Installation Steps

### 1. Navigate to Project Directory
```bash
cd akge-auth-frontend
```

### 2. Install Dependencies
```bash
npm install
```

This will install:
- React & React DOM
- React Router DOM
- Zustand (state management)
- Three.js & React Three Fiber (3D graphics)
- Tailwind CSS (styling)
- Vite (build tool)

### 3. Start Development Server
```bash
npm run dev
```

The application will automatically open at `http://localhost:5173`

### 4. Login with Demo Credentials

Try any of these accounts:

| User ID | Password | Role |
|---------|----------|------|
| student1 | 1234 | Student |
| parent1 | 1234 | Parent |
| teacher1 | 1234 | Teacher |
| management1 | 1234 | Management |
| admin1 | 1234 | Admin |
| investor1 | 1234 | Investor |
| board1 | 1234 | Board Member |

### 5. Explore Features

- **Login Page**: Glassmorphism design with 3D animated background
- **Role Selection**: Dropdown to select user role
- **Dashboards**: Role-specific content and layouts
- **Logout**: Button in header to return to login

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

## Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable components
├── pages/              # Page components
│   └── dashboards/     # Role-specific dashboards
├── store/              # Zustand auth store
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## Key Features

✅ **Multi-Role Authentication** - 7 different user roles
✅ **Glassmorphism Design** - Modern blur and transparency effects
✅ **3D Background** - Animated educational objects
✅ **Protected Routes** - Role-based access control
✅ **Responsive Design** - Works on all devices
✅ **State Management** - Zustand for global auth state
✅ **Demo Accounts** - Pre-loaded credentials for testing
✅ **Smooth Animations** - Professional transitions and effects

## Customization

### Add New Role
1. Update `ROLES` in `src/components/RoleSelector.jsx`
2. Add account to `DEMO_ACCOUNTS` in `src/store/authStore.js`
3. Create dashboard component in `src/pages/dashboards/`
4. Add route in `src/App.jsx`
5. Add config in `src/components/DashboardLayout.jsx`

### Modify Colors
- Edit `tailwind.config.js` for theme
- Update gradients in component files
- Modify `ROLE_CONFIG` in `DashboardLayout.jsx`

### Customize 3D Scene
- Edit `src/components/ThreeScene.jsx`
- Add/remove 3D objects
- Adjust lighting and animations

## Troubleshooting

### Port Already in Use
```bash
npm run dev -- --port 3000
```

### Clear Cache
```bash
rm -rf node_modules package-lock.json
npm install
```

### 3D Scene Not Rendering
- Check browser WebGL support
- Verify Three.js installation
- Check browser console for errors

## Environment Variables

Create `.env.local` file if needed:
```
VITE_API_URL=http://localhost:3000
```

## Performance Tips

- Use Chrome DevTools for profiling
- Check Network tab for bundle size
- Monitor 3D rendering performance
- Use React DevTools for component debugging

## Next Steps

1. ✅ Install and run the project
2. ✅ Test all demo accounts
3. ✅ Explore each role's dashboard
4. ✅ Customize colors and branding
5. ✅ Add your own content
6. ✅ Deploy to production

## Support

For issues or questions:
1. Check the README.md
2. Review component comments
3. Check browser console for errors
4. Verify all dependencies are installed

---

**Happy coding! 🚀**
