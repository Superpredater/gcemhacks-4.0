# Sidebar Customization Guide

## Overview

The role-based sidebar system is fully customizable and extensible. This guide shows you how to modify, extend, and customize the sidebar for your needs.

---

## 📁 File Structure

```
src/
├── components/
│   ├── RoleBasedSidebar.jsx      ← Main sidebar component
│   ├── DashboardLayout.jsx       ← Layout wrapper
│   └── [other components]
└── pages/
    └── dashboards/
        ├── StudentDashboard.jsx
        ├── ParentDashboard.jsx
        ├── TeacherDashboard.jsx
        ├── ManagementDashboard.jsx
        ├── AdminDashboard.jsx
        ├── InvestorDashboard.jsx
        └── BoardDashboard.jsx
```

---

## 🎨 Customizing Navigation Items

### Current Structure

Each role has a navigation configuration:

```javascript
const roleNavigation = {
  student: [
    {
      section: "Learning",
      items: [
        { 
          icon: "📊", 
          label: "Dashboard", 
          href: "#dashboard", 
          description: "Your learning overview" 
        },
        // ... more items
      ]
    },
    // ... more sections
  ],
  // ... other roles
};
```

### Adding a New Item

To add a new navigation item to a role:

```javascript
// In RoleBasedSidebar.jsx, find the role's section
const roleNavigation = {
  student: [
    {
      section: "Learning",
      items: [
        // ... existing items
        { 
          icon: "🎓", 
          label: "Certificates", 
          href: "#certificates", 
          description: "View your earned certificates" 
        },
      ]
    },
  ]
};
```

### Adding a New Section

To add a new section to a role:

```javascript
const roleNavigation = {
  teacher: [
    // ... existing sections
    {
      section: "Resources",
      items: [
        { 
          icon: "📚", 
          label: "Teaching Materials", 
          href: "#materials", 
          description: "Access teaching resources" 
        },
        { 
          icon: "🎥", 
          label: "Video Library", 
          href: "#videos", 
          description: "Educational videos" 
        },
      ]
    },
  ]
};
```

---

## 🎯 Adding a New Role

### Step 1: Add Role Configuration

```javascript
const roleNavigation = {
  // ... existing roles
  mentor: [
    {
      section: "Mentoring",
      items: [
        { 
          icon: "👥", 
          label: "My Mentees", 
          href: "#mentees", 
          description: "View assigned mentees" 
        },
        { 
          icon: "📊", 
          label: "Progress Tracking", 
          href: "#progress", 
          description: "Track mentee progress" 
        },
      ]
    },
    {
      section: "Resources",
      items: [
        { 
          icon: "📚", 
          label: "Mentoring Guide", 
          href: "#guide", 
          description: "Best practices guide" 
        },
      ]
    },
  ]
};
```

### Step 2: Create Dashboard Component

```javascript
// src/pages/dashboards/MentorDashboard.jsx
import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';

export default function MentorDashboard({ userId, onLogout }) {
  return (
    <DashboardLayout role="mentor" userId={userId} onLogout={onLogout}>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-white">Mentor Dashboard</h2>
        {/* Add mentor-specific content */}
      </div>
    </DashboardLayout>
  );
}
```

### Step 3: Add Route

```javascript
// In App.jsx
import MentorDashboard from './pages/dashboards/MentorDashboard';

// Add to routes
<ProtectedRoute requiredRole="mentor">
  <MentorDashboard userId={user.userId} onLogout={logout} />
</ProtectedRoute>
```

### Step 4: Update Auth Store

```javascript
// In authStore.js
const demoAccounts = {
  // ... existing accounts
  mentor1: { password: '1234', role: 'mentor' },
};
```

---

## 🎨 Styling Customization

### Change Sidebar Colors

```javascript
// In RoleBasedSidebar.jsx
<div className={`fixed left-0 top-0 h-screen 
  bg-gradient-to-b from-slate-900/95 to-slate-800/95  // ← Change these
  backdrop-blur-xl border-r border-white/10 
  transition-all duration-300 z-40 ${
    sidebarOpen ? 'w-64' : 'w-20'
  }`}>
```

### Change to Different Gradient

```javascript
// Example: Purple gradient
bg-gradient-to-b from-purple-900/95 to-purple-800/95

// Example: Blue gradient
bg-gradient-to-b from-blue-900/95 to-blue-800/95

// Example: Green gradient
bg-gradient-to-b from-green-900/95 to-green-800/95
```

### Change Hover Effects

```javascript
// Current hover effect
className="... hover:bg-white/10 hover:text-white ..."

// Alternative: More subtle
className="... hover:bg-white/5 hover:text-gray-200 ..."

// Alternative: More prominent
className="... hover:bg-white/20 hover:text-white ..."
```

### Change Section Header Styling

```javascript
// Current styling
className="... text-xs font-semibold text-gray-400 hover:text-gray-300 ..."

// Alternative: Larger, bolder
className="... text-sm font-bold text-gray-300 hover:text-white ..."

// Alternative: Colored
className="... text-xs font-semibold text-blue-400 hover:text-blue-300 ..."
```

---

## 🔧 Advanced Customization

### Add Active State Tracking

```javascript
// In RoleBasedSidebar.jsx
const [activeItem, setActiveItem] = useState(null);

// In navigation item button
<button
  onClick={() => {
    setActiveItem(item.href);
    onNavigate && onNavigate(item.href);
  }}
  className={`... ${activeItem === item.href ? 'bg-white/20 text-white' : ''}`}
>
```

### Add Search Functionality

```javascript
// Add to RoleBasedSidebar.jsx
const [searchTerm, setSearchTerm] = useState('');

// Filter items based on search
const filteredNavigation = navigation.map(section => ({
  ...section,
  items: section.items.filter(item =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  )
})).filter(section => section.items.length > 0);

// Add search input
<div className="px-4 py-3 border-b border-white/10">
  <input
    type="text"
    placeholder="Search..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full px-3 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400"
  />
</div>
```

### Add Favorites/Pinned Items

```javascript
// Add state for favorites
const [favorites, setFavorites] = useState([]);

// Add favorite button to items
<button
  onClick={() => {
    setFavorites(prev => 
      prev.includes(item.href) 
        ? prev.filter(f => f !== item.href)
        : [...prev, item.href]
    );
  }}
  className="text-yellow-400"
>
  {favorites.includes(item.href) ? '⭐' : '☆'}
</button>

// Show favorites section at top
{favorites.length > 0 && (
  <div className="space-y-1 mb-4 pb-4 border-b border-white/10">
    <p className="text-xs font-semibold text-gray-400 px-4">FAVORITES</p>
    {/* Show favorite items */}
  </div>
)}
```

### Add Keyboard Shortcuts

```javascript
// Add keyboard navigation
useEffect(() => {
  const handleKeyPress = (e) => {
    // Ctrl+K to focus search
    if (e.ctrlKey && e.key === 'k') {
      e.preventDefault();
      searchInputRef.current?.focus();
    }
    // Ctrl+B to toggle sidebar
    if (e.ctrlKey && e.key === 'b') {
      e.preventDefault();
      onToggle();
    }
  };

  window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, [onToggle]);
```

---

## 📱 Responsive Customization

### Change Sidebar Width

```javascript
// Current widths
sidebarOpen ? 'w-64' : 'w-20'

// Wider sidebar
sidebarOpen ? 'w-80' : 'w-24'

// Narrower sidebar
sidebarOpen ? 'w-56' : 'w-16'
```

### Change Main Content Margin

```javascript
// In DashboardLayout.jsx
<div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>

// Adjust to match sidebar width changes
sidebarOpen ? 'ml-80' : 'ml-24'
```

### Mobile-Specific Behavior

```javascript
// Add mobile detection
const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth < 768);
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

// Auto-collapse on mobile
useEffect(() => {
  if (isMobile) setSidebarOpen(false);
}, [isMobile]);
```

---

## 🎯 Icon Customization

### Change Icons

```javascript
// Current: Emoji icons
{ icon: "📊", label: "Dashboard", ... }

// Alternative: Unicode symbols
{ icon: "▦", label: "Dashboard", ... }

// Alternative: Text icons
{ icon: "[D]", label: "Dashboard", ... }

// Alternative: Custom SVG (requires more setup)
{ icon: <DashboardIcon />, label: "Dashboard", ... }
```

### Icon Sets

```javascript
// Educational icons
📚 📖 📝 ✏️ 🎓 🏫 👨‍🎓 👨‍🏫

// Analytics icons
📊 📈 📉 💹 🎯 📍 🔍

// System icons
⚙️ 🔧 🛠️ ⚡ 🔌 💾 🖥️

// User icons
👥 👤 👨 👩 👨‍👩‍👧 🧑

// Security icons
🔒 🔐 🛡️ 🔑 ⚠️ ✅

// Communication icons
💬 📢 📣 🔔 📧 📞
```

---

## 🧪 Testing Customizations

### Test Checklist

- [ ] Sidebar renders correctly
- [ ] All items are clickable
- [ ] Sections expand/collapse
- [ ] Tooltips appear on hover
- [ ] Responsive on mobile
- [ ] Keyboard navigation works
- [ ] No console errors
- [ ] Styling looks correct
- [ ] Animations are smooth
- [ ] Performance is good

### Debug Tips

```javascript
// Log navigation configuration
console.log('Navigation:', roleNavigation[role]);

// Log sidebar state
console.log('Sidebar Open:', sidebarOpen);
console.log('Expanded Sections:', expandedSections);

// Log navigation clicks
const handleNavigation = (href) => {
  console.log('Navigating to:', href);
};
```

---

## 📚 Component API

### RoleBasedSidebar Props

```javascript
<RoleBasedSidebar
  role="student"              // Current user role
  sidebarOpen={true}          // Sidebar expanded state
  onToggle={() => {}}         // Callback for toggle button
  onNavigate={(href) => {}}   // Callback for navigation
/>
```

### DashboardLayout Props

```javascript
<DashboardLayout
  role="student"              // Current user role
  userId="student1"           // Current user ID
  onLogout={() => {}}         // Callback for logout
>
  {/* Children content */}
</DashboardLayout>
```

---

## 🚀 Performance Tips

### Optimize Re-renders

```javascript
// Use React.memo for navigation items
const NavigationItem = React.memo(({ item, isActive, onClick }) => (
  <button onClick={onClick} className={...}>
    {/* Item content */}
  </button>
));
```

### Lazy Load Sections

```javascript
// Only render expanded sections
{(sidebarOpen ? expandedSections[section.section] !== false : true) && (
  <div className="space-y-1">
    {section.items.map(/* ... */)}
  </div>
)}
```

### Memoize Navigation Config

```javascript
// Move outside component to prevent recreation
const roleNavigation = { /* ... */ };

// Or use useMemo
const navigation = useMemo(() => roleNavigation[role], [role]);
```

---

## 🐛 Common Issues & Solutions

### Issue: Sidebar Not Updating on Role Change
**Solution**: Add `key={role}` to RoleBasedSidebar component

```javascript
<RoleBasedSidebar key={role} role={role} {...props} />
```

### Issue: Sections Not Expanding
**Solution**: Check expandedSections state initialization

```javascript
const [expandedSections, setExpandedSections] = useState({});
// Initialize with all sections expanded
const [expandedSections, setExpandedSections] = useState(
  Object.fromEntries(navigation.map(s => [s.section, true]))
);
```

### Issue: Tooltips Not Showing
**Solution**: Ensure pointer-events are not disabled

```javascript
// Remove pointer-events-none from parent
// Or add pointer-events-auto to tooltip
className="... pointer-events-auto ..."
```

---

## 📖 Resources

- [Tailwind CSS Documentation](https://tailwindcss.com)
- [React Documentation](https://react.dev)
- [React Router Documentation](https://reactrouter.com)
- [Emoji Reference](https://emojipedia.org)

---

## 🎉 Next Steps

1. **Customize Colors** - Match your brand
2. **Add New Roles** - Extend for your use case
3. **Implement Routing** - Connect to actual pages
4. **Add Features** - Search, favorites, shortcuts
5. **Test Thoroughly** - All roles and devices

---

**Version**: 1.0.0  
**Status**: ✅ Production Ready  
**Last Updated**: 2024

Happy customizing! 🚀
