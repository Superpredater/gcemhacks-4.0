# AKGE Authentication Frontend

A modern, scalable multi-role authentication system built with React (Vite), featuring glassmorphism design and 3D animated backgrounds.

## 🚀 Features

- **Multi-Role Authentication**: 7 different user roles (Student, Parent, Teacher, Management, Admin, Investor, Board Member)
- **Glassmorphism UI**: Modern blur and transparency effects with gradient backgrounds
- **3D Animated Background**: React Three Fiber with floating educational objects (books, graduation caps, atoms, globes, pencils)
- **Protected Routes**: Role-based access control with automatic redirects
- **Responsive Design**: Fully responsive on all devices
- **State Management**: Zustand for global auth state
- **Demo Accounts**: Pre-loaded credentials for testing
- **Smooth Animations**: Fade-in, slide-up, and pulse-glow effects
- **Role-Specific Dashboards**: Unique layouts and content for each role

## 📋 Demo Credentials

```
Student:     student1 / 1234
Parent:      parent1 / 1234
Teacher:     teacher1 / 1234
Management:  management1 / 1234
Admin:       admin1 / 1234
Investor:    investor1 / 1234
Board:       board1 / 1234
```

## 🛠️ Tech Stack

- **React 18.2** - UI library
- **Vite** - Build tool
- **React Router DOM** - Routing
- **Zustand** - State management
- **Three.js & React Three Fiber** - 3D graphics
- **Tailwind CSS** - Styling
- **PostCSS & Autoprefixer** - CSS processing

## 📦 Installation

```bash
# Navigate to project directory
cd akge-auth-frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
akge-auth-frontend/
├── src/
│   ├── components/
│   │   ├── AuthForm.jsx          # Login/Signup form
│   │   ├── RoleSelector.jsx      # Role dropdown
│   │   ├── ProtectedRoute.jsx    # Route protection
│   │   ├── ThreeScene.jsx        # 3D background
│   │   └── DashboardLayout.jsx   # Dashboard wrapper
│   ├── pages/
│   │   ├── Login.jsx             # Login page
│   │   ├── Signup.jsx            # Signup page
│   │   └── dashboards/
│   │       ├── StudentDashboard.jsx
│   │       ├── ParentDashboard.jsx
│   │       ├── TeacherDashboard.jsx
│   │       ├── ManagementDashboard.jsx
│   │       ├── AdminDashboard.jsx
│   │       ├── InvestorDashboard.jsx
│   │       └── BoardDashboard.jsx
│   ├── store/
│   │   └── authStore.js          # Zustand auth store
│   ├── App.jsx                   # Main app component
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## 🎨 Design Features

### Glassmorphism
- Frosted glass effect with backdrop blur
- Semi-transparent backgrounds
- Gradient overlays
- Smooth borders with transparency

### 3D Background
- Floating books with rotation
- Spinning graduation cap
- Animated atom model with electron orbits
- Rotating globe
- Animated pencil
- Soft lighting with multiple light sources
- Parallax-like depth effect

### Animations
- Fade-in on page load
- Slide-up for form elements
- Pulse-glow on buttons
- Smooth transitions on hover
- Loading spinner during authentication

## 🔐 Authentication Flow

1. User enters credentials and selects role
2. Credentials validated against demo accounts
3. Session stored in localStorage
4. User redirected to role-specific dashboard
5. Protected routes prevent unauthorized access
6. Logout clears session and redirects to login

## 🎯 Role-Based Dashboards

Each role has a unique dashboard with:
- Role-specific greeting with user ID
- Relevant metrics and statistics
- Role-appropriate content and actions
- Consistent glassmorphism design
- Logout functionality

### Student Dashboard
- Overall mastery percentage
- Concepts mastered count
- Learning streak
- Current learning path

### Parent Dashboard
- Child's progress tracking
- Performance metrics
- Recent activity log

### Teacher Dashboard
- Class statistics
- Student performance by topic
- Class average metrics

### Management Dashboard
- Institutional metrics
- Department performance
- Resource allocation overview

### Admin Dashboard
- System status
- Uptime metrics
- Active users count
- Admin action buttons

### Investor Dashboard
- Financial metrics
- ROI analytics
- Portfolio overview
- Growth indicators

### Board Dashboard
- Strategic metrics
- Board meeting information
- Committee overview
- Strategic initiatives tracking

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Open browser**
   - Navigate to `http://localhost:5173`

4. **Login with demo credentials**
   - Try: `student1` / `1234` as Student

5. **Explore dashboards**
   - Each role has unique content and layout

## 🔧 Customization

### Add New Role
1. Add role to `ROLES` array in `RoleSelector.jsx`
2. Add demo account to `DEMO_ACCOUNTS` in `authStore.js`
3. Create new dashboard component
4. Add route in `App.jsx`
5. Add role config in `DashboardLayout.jsx`

### Modify Colors
- Edit `tailwind.config.js` for theme colors
- Update gradient colors in component files
- Modify `ROLE_CONFIG` in `DashboardLayout.jsx`

### Customize 3D Scene
- Edit `ThreeScene.jsx` to add/remove objects
- Adjust lighting in `Lights()` component
- Modify rotation speeds and animations

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Touch-friendly buttons and inputs
- Adaptive layouts for all screen sizes

## ⚡ Performance

- Lazy loading of routes
- Optimized 3D rendering
- Efficient state management
- CSS animations instead of JS
- Minimal bundle size with Vite

## 🐛 Troubleshooting

### 3D Scene not rendering
- Check browser WebGL support
- Ensure Three.js is properly installed
- Check browser console for errors

### Styles not applying
- Clear node_modules and reinstall
- Rebuild Tailwind CSS
- Check PostCSS configuration

### Authentication not working
- Verify demo credentials match exactly
- Check localStorage in browser DevTools
- Ensure role matches account role

## 📝 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📞 Support

For issues or questions, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ for AKGE - Adaptive Knowledge Graph Engine**
