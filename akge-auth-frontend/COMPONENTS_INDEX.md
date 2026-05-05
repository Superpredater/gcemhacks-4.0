# AKGE Frontend - Components Index

## 📋 Complete Component Reference

### Core Application

#### `src/App.jsx`
**Purpose**: Main application component with routing  
**Features**:
- React Router setup
- Route definitions for all pages
- Protected route wrappers
- Auth initialization

**Key Functions**:
- `useEffect` - Initialize auth from localStorage
- Route rendering with role-based protection

---

#### `src/main.jsx`
**Purpose**: Application entry point  
**Features**:
- React DOM rendering
- Root element mounting

---

### Components (Reusable)

#### `src/components/AuthForm.jsx`
**Purpose**: Unified login/signup form component  
**Props**:
- `isSignup` (boolean) - Toggle between login and signup mode

**Features**:
- User ID input field
- Password input with visibility toggle
- Role selector (signup only)
- Error message display
- Loading state with spinner
- Demo account quick buttons
- Form validation
- Navigation links

**State**:
- `userId` - User ID input
- `password` - Password input
- `role` - Selected role
- `showPassword` - Password visibility toggle

**Functions**:
- `handleSubmit()` - Form submission handler
- `handleDemoLogin()` - Quick demo login

---

#### `src/components/RoleSelector.jsx`
**Purpose**: Interactive role selection component  
**Props**:
- `value` (string) - Currently selected role
- `onChange` (function) - Callback when role changes

**Features**:
- 7 role options with icons
- Visual feedback on selection
- Smooth transitions
- Responsive grid layout

**Roles**:
1. Student (👨‍🎓)
2. Parent (👨‍👩‍👧)
3. Teacher (👨‍🏫)
4. Management (👔)
5. Admin (⚙️)
6. Investor (💼)
7. Board Member (🏛️)

---

#### `src/components/ProtectedRoute.jsx`
**Purpose**: Route protection wrapper  
**Props**:
- `children` (ReactNode) - Component to render if authorized
- `requiredRole` (string) - Required role for access

**Features**:
- Authentication check
- Role-based access control
- Automatic redirection
- Fallback to login

**Logic**:
- Checks if user is authenticated
- Verifies user role matches required role
- Redirects to login if not authenticated
- Redirects to user's dashboard if wrong role

---

#### `src/components/ThreeScene.jsx`
**Purpose**: 3D background with React Three Fiber  
**Features**:
- Canvas setup with Three.js
- Multiple animated objects
- Soft lighting system
- Auto-rotating camera
- Parallax depth effect

**Objects**:
1. **FloatingBook** - Rotating books with bobbing animation
2. **GraduationCap** - Spinning graduation cap
3. **AtomModel** - Orbiting electrons around nucleus
4. **Globe** - Rotating globe with glow
5. **Pencil** - Rotating pencil

**Lighting**:
- Ambient light (white, intensity 0.6)
- Point light 1 (white, intensity 0.8)
- Point light 2 (blue, intensity 0.4)
- Point light 3 (green, intensity 0.3)

**Camera**:
- Perspective camera
- Position: [0, 0, 8]
- Auto-rotate enabled
- Zoom disabled
- Pan disabled

---

#### `src/components/DashboardLayout.jsx`
**Purpose**: Shared dashboard layout component  
**Props**:
- `role` (string) - User role for display
- `userId` (string) - User ID for display
- `onLogout` (function) - Logout callback
- `children` (ReactNode) - Dashboard content

**Features**:
- Collapsible sidebar navigation
- Top navigation bar
- User profile menu
- Notification icons
- Settings menu
- Logout button
- Responsive design
- Animated background

**State**:
- `sidebarOpen` - Sidebar visibility toggle

**Navigation Items**:
- Dashboard
- Content
- Analytics
- Settings
- Help

---

### Pages

#### `src/pages/Login.jsx`
**Purpose**: Login page  
**Features**:
- 3D background scene
- AuthForm component
- Automatic redirect if already logged in
- Overlay gradients
- Animated background elements

**Route**: `/login`

---

#### `src/pages/Signup.jsx`
**Purpose**: Signup page  
**Features**:
- 3D background scene
- AuthForm component (signup mode)
- Role selection
- Automatic redirect if already logged in
- Overlay gradients
- Animated background elements

**Route**: `/signup`

---

### Dashboard Pages

#### `src/pages/dashboards/StudentDashboard.jsx`
**Purpose**: Student-specific dashboard  
**Route**: `/student/dashboard`

**Features**:
- Welcome section with gradient
- Quick stats (Concepts Mastered, Learning Streak, Progress)
- Current Learning Path with progress bars
- Recent Assessments list
- Role-specific layout

**Components Used**:
- DashboardLayout
- StatCard (custom)

---

#### `src/pages/dashboards/ParentDashboard.jsx`
**Purpose**: Parent-specific dashboard  
**Route**: `/parent/dashboard`

**Features**:
- Child profile information
- Performance summary with progress bars
- Recent activity timeline
- Alerts and recommendations
- Role-specific layout

**Components Used**:
- DashboardLayout
- ProgressBar (custom)
- AlertBox (custom)

---

#### `src/pages/dashboards/TeacherDashboard.jsx`
**Purpose**: Teacher-specific dashboard  
**Route**: `/teacher/dashboard`

**Features**:
- Class overview metrics
- Class performance breakdown
- Weak concept clusters identification
- Quick action buttons
- Role-specific layout

**Components Used**:
- DashboardLayout
- StatCard (custom)
- ActionButton (custom)

---

#### `src/pages/dashboards/ManagementDashboard.jsx`
**Purpose**: Management-specific dashboard  
**Route**: `/management/dashboard`

**Features**:
- Key metrics (Students, Teachers, Mastery, Retention)
- Department performance
- Growth trends
- Strategic initiatives with progress
- Management action buttons
- Role-specific layout

**Components Used**:
- DashboardLayout
- MetricCard (custom)
- ActionButton (custom)

---

#### `src/pages/dashboards/AdminDashboard.jsx`
**Purpose**: Admin-specific dashboard  
**Route**: `/admin/dashboard`

**Features**:
- System health metrics
- Recent system events log
- User statistics
- Security status
- Admin action buttons
- Role-specific layout

**Components Used**:
- DashboardLayout
- HealthCard (custom)
- AdminActionButton (custom)

---

#### `src/pages/dashboards/InvestorDashboard.jsx`
**Purpose**: Investor-specific dashboard  
**Route**: `/investor/dashboard`

**Features**:
- Financial overview (Investment, Valuation, Revenue, Growth)
- Business metrics
- Revenue breakdown
- Growth projections
- Investment action buttons
- Role-specific layout

**Components Used**:
- DashboardLayout
- FinanceCard (custom)
- InvestmentButton (custom)

---

#### `src/pages/dashboards/BoardDashboard.jsx`
**Purpose**: Board member-specific dashboard  
**Route**: `/board/dashboard`

**Features**:
- Executive summary metrics
- Strategic initiatives and goals
- Key performance indicators
- Governance compliance
- Board action buttons
- Role-specific layout

**Components Used**:
- DashboardLayout
- SummaryCard (custom)
- BoardActionButton (custom)

---

### State Management

#### `src/store/authStore.js`
**Purpose**: Zustand auth state store  
**Features**:
- Global authentication state
- localStorage persistence
- Demo account validation

**State**:
- `user` - Current user object
- `isAuthenticated` - Auth status
- `isLoading` - Loading state
- `error` - Error message

**Actions**:
- `initializeAuth()` - Load auth from localStorage
- `login(userId, password)` - Login user
- `signup(userId, password, role)` - Create new account
- `logout()` - Logout user
- `clearError()` - Clear error message

**Demo Accounts**:
```javascript
{
  student1: { password: '1234', role: 'student' },
  parent1: { password: '1234', role: 'parent' },
  teacher1: { password: '1234', role: 'teacher' },
  management1: { password: '1234', role: 'management' },
  admin1: { password: '1234', role: 'admin' },
  investor1: { password: '1234', role: 'investor' },
  board1: { password: '1234', role: 'board' }
}
```

---

### Styling

#### `src/index.css`
**Purpose**: Global styles and animations  
**Features**:
- Tailwind CSS imports
- Custom animations
- Scrollbar styling
- Utility classes
- Glassmorphism effects
- Gradient text
- Smooth transitions

**Custom Animations**:
- `fadeIn` - Fade in with slide up
- `slideInLeft` - Slide in from left
- `slideInRight` - Slide in from right
- `pulse` - Pulsing opacity
- `spin` - Rotating animation

---

## 🔄 Component Relationships

```
App.jsx
├── Login.jsx
│   ├── ThreeScene.jsx
│   └── AuthForm.jsx
│       ├── RoleSelector.jsx
│       └── useAuthStore
├── Signup.jsx
│   ├── ThreeScene.jsx
│   └── AuthForm.jsx
│       ├── RoleSelector.jsx
│       └── useAuthStore
└── ProtectedRoute.jsx
    ├── StudentDashboard.jsx
    │   ├── DashboardLayout.jsx
    │   └── StatCard.jsx
    ├── ParentDashboard.jsx
    │   ├── DashboardLayout.jsx
    │   ├── ProgressBar.jsx
    │   └── AlertBox.jsx
    ├── TeacherDashboard.jsx
    │   ├── DashboardLayout.jsx
    │   ├── StatCard.jsx
    │   └── ActionButton.jsx
    ├── ManagementDashboard.jsx
    │   ├── DashboardLayout.jsx
    │   ├── MetricCard.jsx
    │   └── ActionButton.jsx
    ├── AdminDashboard.jsx
    │   ├── DashboardLayout.jsx
    │   ├── HealthCard.jsx
    │   └── AdminActionButton.jsx
    ├── InvestorDashboard.jsx
    │   ├── DashboardLayout.jsx
    │   ├── FinanceCard.jsx
    │   └── InvestmentButton.jsx
    └── BoardDashboard.jsx
        ├── DashboardLayout.jsx
        ├── SummaryCard.jsx
        └── BoardActionButton.jsx
```

---

## 📊 Component Statistics

| Category | Count |
|----------|-------|
| Main Components | 1 |
| Reusable Components | 5 |
| Page Components | 2 |
| Dashboard Components | 7 |
| Custom Sub-components | 15+ |
| Total Components | 30+ |

---

## 🎯 Component Usage Guide

### Using AuthForm
```jsx
import AuthForm from './components/AuthForm';

// Login mode
<AuthForm isSignup={false} />

// Signup mode
<AuthForm isSignup={true} />
```

### Using ProtectedRoute
```jsx
import ProtectedRoute from './components/ProtectedRoute';

<Route
  path="/student/dashboard"
  element={
    <ProtectedRoute requiredRole="student">
      <StudentDashboard />
    </ProtectedRoute>
  }
/>
```

### Using DashboardLayout
```jsx
import DashboardLayout from './components/DashboardLayout';

<DashboardLayout 
  role="Student" 
  userId={user?.userId}
  onLogout={handleLogout}
>
  {/* Dashboard content */}
</DashboardLayout>
```

### Using Auth Store
```jsx
import useAuthStore from './store/authStore';

const { user, login, logout, isAuthenticated } = useAuthStore();
```

---

## 🚀 Component Best Practices

1. **Reusability**: Components are designed to be reused
2. **Props**: Clear prop interfaces for customization
3. **State**: Minimal local state, global state in Zustand
4. **Styling**: Tailwind CSS for consistency
5. **Performance**: Optimized rendering with React hooks
6. **Accessibility**: Semantic HTML and ARIA labels
7. **Documentation**: JSDoc comments for clarity

---

## 📝 Adding New Components

### Template
```jsx
import React from 'react';

export default function NewComponent({ prop1, prop2 }) {
  return (
    <div className="...">
      {/* Component content */}
    </div>
  );
}
```

### Steps
1. Create file in appropriate directory
2. Export as default
3. Add to App.jsx if it's a page
4. Use in other components as needed

---

**Component Index Complete! 🎉**

For more details, see `COMPLETE_SETUP.md` and `FRONTEND_SUMMARY.md`.
