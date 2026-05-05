# AKGE Authentication Frontend - Complete Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

```bash
# Navigate to project directory
cd akge-auth-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

---

## 📁 Project Structure

```
akge-auth-frontend/
├── src/
│   ├── components/
│   │   ├── AuthForm.jsx           # Login/Signup form component
│   │   ├── RoleSelector.jsx       # Role selection dropdown
│   │   ├── ProtectedRoute.jsx     # Route protection wrapper
│   │   ├── ThreeScene.jsx         # 3D background with React Three Fiber
│   │   └── DashboardLayout.jsx    # Shared dashboard layout
│   ├── pages/
│   │   ├── Login.jsx              # Login page
│   │   ├── Signup.jsx             # Signup page
│   │   └── dashboards/
│   │       ├── StudentDashboard.jsx
│   │       ├── ParentDashboard.jsx
│   │       ├── TeacherDashboard.jsx
│   │       ├── ManagementDashboard.jsx
│   │       ├── AdminDashboard.jsx
│   │       ├── InvestorDashboard.jsx
│   │       └── BoardDashboard.jsx
│   ├── store/
│   │   └── authStore.js           # Zustand auth state management
│   ├── App.jsx                    # Main app component with routing
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Global styles
├── public/                        # Static assets
├── index.html                     # HTML template
├── vite.config.js                 # Vite configuration
├── tailwind.config.js             # Tailwind CSS configuration
├── postcss.config.js              # PostCSS configuration
└── package.json                   # Dependencies and scripts
```

---

## 🔐 Demo Credentials

### Pre-loaded Demo Accounts

| Role | User ID | Password |
|------|---------|----------|
| Student | student1 | 1234 |
| Parent | parent1 | 1234 |
| Teacher | teacher1 | 1234 |
| Management | management1 | 1234 |
| Admin | admin1 | 1234 |
| Investor | investor1 | 1234 |
| Board Member | board1 | 1234 |

### Quick Demo Login
Click any demo account button on the login page to instantly log in.

---

## 🎨 Features

### 1. **Multi-Role Authentication**
- 7 different user roles with unique dashboards
- Role-based access control
- Protected routes with automatic redirection

### 2. **Glassmorphism UI Design**
- Modern blur and transparency effects
- Gradient backgrounds
- Smooth animations and transitions
- Fully responsive design

### 3. **3D Background Animation**
- React Three Fiber integration
- Floating educational objects:
  - Books
  - Graduation cap
  - Atom model
  - Globe
  - Pencil
- Soft lighting and depth effects
- Auto-rotating scene

### 4. **Role-Specific Dashboards**
Each role has a unique dashboard with:
- **Student**: Learning path, assessments, progress tracking
- **Parent**: Child monitoring, performance analytics
- **Teacher**: Class management, weak concept identification
- **Management**: Department performance, strategic initiatives
- **Admin**: System health, user management, security
- **Investor**: Financial metrics, growth projections
- **Board**: Strategic governance, KPIs, compliance

### 5. **State Management**
- Zustand for global auth state
- localStorage persistence
- Session management

### 6. **Responsive Design**
- Mobile-first approach
- Tailwind CSS utility classes
- Adaptive layouts for all screen sizes

---

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory (optional):

```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=AKGE
```

### Tailwind CSS
Configured in `tailwind.config.js` with:
- Custom color schemes
- Extended spacing
- Animation utilities

### Vite Configuration
Configured in `vite.config.js` with:
- React plugin
- Optimized build settings
- Development server settings

---

## 📱 Usage

### Login Flow
1. Navigate to `/login`
2. Enter User ID and Password
3. Select role (if needed)
4. Click "Login" or use demo account
5. Redirected to role-specific dashboard

### Signup Flow
1. Navigate to `/signup`
2. Enter User ID, Password, and select Role
3. Click "Create Account"
4. Automatically logged in and redirected to dashboard

### Logout
Click "Logout" button in the top-right corner of any dashboard.

---

## 🎯 Component Details

### AuthForm Component
Handles both login and signup with:
- Input validation
- Error handling
- Loading states
- Demo account quick access
- Password visibility toggle

### RoleSelector Component
Interactive role selection with:
- 7 role options with icons
- Visual feedback on selection
- Smooth transitions

### ProtectedRoute Component
Route protection with:
- Authentication check
- Role-based access control
- Automatic redirection

### ThreeScene Component
3D background with:
- Multiple floating objects
- Soft lighting
- Auto-rotation
- Parallax effect

### DashboardLayout Component
Shared dashboard layout with:
- Collapsible sidebar
- Top navigation bar
- User menu
- Responsive design

---

## 🚀 Build & Deployment

### Development Build
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

---

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize color schemes:
```javascript
colors: {
  primary: '#3b82f6',
  secondary: '#06b6d4',
  // ... more colors
}
```

### Animations
Modify animations in `src/index.css`:
```css
@keyframes customAnimation {
  from { /* ... */ }
  to { /* ... */ }
}
```

### Dashboard Content
Edit individual dashboard files in `src/pages/dashboards/` to customize content.

---

## 🔒 Security Notes

### Current Implementation
- Mock authentication (for demo purposes)
- localStorage for session storage
- Client-side validation

### Production Recommendations
- Implement backend authentication
- Use secure HTTP-only cookies
- Add CSRF protection
- Implement rate limiting
- Use JWT tokens with refresh rotation
- Add encryption for sensitive data

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Use a different port
npm run dev -- --port 3000
```

### Dependencies Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Three.js Not Rendering
- Ensure WebGL is supported in your browser
- Check browser console for errors
- Verify Three.js and React Three Fiber versions

### Styling Issues
```bash
# Rebuild Tailwind CSS
npm run build
```

---

## 📚 Technology Stack

- **React 18.2.0** - UI library
- **Vite 5.0.0** - Build tool
- **React Router DOM 6.20.0** - Routing
- **Zustand 4.4.0** - State management
- **Three.js r128** - 3D graphics
- **React Three Fiber 8.15.0** - React renderer for Three.js
- **Tailwind CSS 3.3.0** - Utility-first CSS
- **PostCSS 8.4.0** - CSS processing

---

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## 🤝 Contributing

To extend this project:

1. Create new dashboard pages in `src/pages/dashboards/`
2. Add new components in `src/components/`
3. Update routing in `src/App.jsx`
4. Maintain consistent styling with Tailwind CSS

---

## 📄 License

This project is part of the AKGE (Adaptive Knowledge Graph Engine) platform.

---

## 🆘 Support

For issues or questions:
1. Check the troubleshooting section
2. Review component documentation
3. Check browser console for errors
4. Verify all dependencies are installed

---

## ✨ Features Roadmap

- [ ] Backend API integration
- [ ] Real authentication
- [ ] Database persistence
- [ ] Advanced analytics
- [ ] Mobile app
- [ ] Dark/Light theme toggle
- [ ] Multi-language support
- [ ] Accessibility improvements

---

**Happy Learning! 🎓**
