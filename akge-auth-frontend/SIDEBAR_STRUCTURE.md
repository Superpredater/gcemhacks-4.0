# Sidebar Structure & Visual Guide

## 📐 Sidebar Layout

```
┌─────────────────────────────────────┐
│  AKGE                               │  ← Logo Section
│  Learning Platform                  │
├─────────────────────────────────────┤
│  [Student]                          │  ← Role Badge
├─────────────────────────────────────┤
│                                     │
│  LEARNING                      ▼    │  ← Section Header (Expandable)
│  📊 Dashboard                       │
│  📚 Learning Path                   │
│  🎯 Concepts                        │
│  📝 Assessments                     │
│                                     │
│  PROGRESS                      ▼    │
│  📈 Mastery Score                   │
│  🏆 Achievements                    │
│  📊 Analytics                       │
│                                     │
│  SUPPORT                       ▼    │
│  ❓ Help                            │
│  ⚙️ Settings                        │
│                                     │
├─────────────────────────────────────┤
│  ◀ Collapse                         │  ← Toggle Button
└─────────────────────────────────────┘
```

---

## 🎨 Sidebar States

### Expanded State (w-64)
```
┌──────────────────────────────────────────┐
│ A  AKGE                                  │
│    Learning Platform                     │
├──────────────────────────────────────────┤
│ [Student]                                │
├──────────────────────────────────────────┤
│ LEARNING                            ▼    │
│ 📊 Dashboard                             │
│    Your learning overview                │
│ 📚 Learning Path                         │
│    Personalized learning journey         │
│ 🎯 Concepts                              │
│    Master concepts                       │
│ 📝 Assessments                           │
│    Take quizzes & tests                  │
│                                          │
│ PROGRESS                            ▼    │
│ 📈 Mastery Score                         │
│    Track your progress                   │
│ 🏆 Achievements                          │
│    Badges & milestones                   │
│ 📊 Analytics                             │
│    Detailed insights                     │
│                                          │
│ SUPPORT                             ▼    │
│ ❓ Help                                  │
│    Get assistance                        │
│ ⚙️ Settings                              │
│    Preferences                           │
│                                          │
├──────────────────────────────────────────┤
│ ◀ Collapse                               │
└──────────────────────────────────────────┘
```

### Collapsed State (w-20)
```
┌────────┐
│ A      │
├────────┤
│ 📊     │ ← Tooltip on hover
│ 📚     │
│ 🎯     │
│ 📝     │
│        │
│ 📈     │
│ 🏆     │
│ 📊     │
│        │
│ ❓     │
│ ⚙️     │
│        │
├────────┤
│ ▶      │
└────────┘
```

---

## 🔄 Interaction States

### Hover State
```
┌──────────────────────────────────────────┐
│ 📊 Dashboard                             │
│    Your learning overview                │
│ ← Highlighted with bg-white/10           │
│ ← Text color changes to white            │
└──────────────────────────────────────────┘
```

### Expanded Section
```
┌──────────────────────────────────────────┐
│ LEARNING                            ▲    │ ← Arrow rotated
│ 📊 Dashboard                             │
│    Your learning overview                │
│ 📚 Learning Path                         │
│    Personalized learning journey         │
│ 🎯 Concepts                              │
│    Master concepts                       │
│ 📝 Assessments                           │
│    Take quizzes & tests                  │
└──────────────────────────────────────────┘
```

### Collapsed Section
```
┌──────────────────────────────────────────┐
│ LEARNING                            ▼    │ ← Arrow normal
│ (Items hidden)                           │
└──────────────────────────────────────────┘
```

---

## 📱 Responsive Breakpoints

### Desktop (> 1024px)
```
┌─────────────────────────────────────────────────────────────────┐
│ ┌──────────────┐ ┌──────────────────────────────────────────┐  │
│ │              │ │                                          │  │
│ │   Sidebar    │ │        Main Content Area                │  │
│ │   (w-64)     │ │                                          │  │
│ │              │ │                                          │  │
│ │              │ │                                          │  │
│ └──────────────┘ └──────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### Tablet (640px - 1024px)
```
┌──────────────────────────────────────────┐
│ ┌──┐ ┌──────────────────────────────┐   │
│ │  │ │                              │   │
│ │  │ │   Main Content Area          │   │
│ │  │ │                              │   │
│ │  │ │                              │   │
│ └──┘ └──────────────────────────────┘   │
└──────────────────────────────────────────┘
```

### Mobile (< 640px)
```
┌──────────────────────────────────────────┐
│ ┌──┐ ┌──────────────────────────────┐   │
│ │  │ │                              │   │
│ │  │ │   Main Content Area          │   │
│ │  │ │                              │   │
│ │  │ │                              │   │
│ └──┘ └──────────────────────────────┘   │
└──────────────────────────────────────────┘
```

---

## 🎯 Role-Specific Sidebar Structures

### 👨‍🎓 Student Sidebar
```
AKGE Learning Platform
[Student]

LEARNING ▼
  📊 Dashboard
  📚 Learning Path
  🎯 Concepts
  📝 Assessments

PROGRESS ▼
  📈 Mastery Score
  🏆 Achievements
  📊 Analytics

SUPPORT ▼
  ❓ Help
  ⚙️ Settings
```

### 👨‍🏫 Teacher Sidebar
```
AKGE Learning Platform
[Teacher]

CLASS MONITORING ▼
  📊 Dashboard
  📈 Mastery Distribution
  ⚠️ Weak Concepts
  👥 Student Performance

TEACHING INSIGHTS ▼
  🔍 Prerequisite Gaps
  📊 Learning Patterns
  💡 Recommendations

CONTENT CONTROL ▼
  📚 Question Bank
  🏷️ Concept Tagging
  ⚡ Difficulty Levels

SYSTEM CONTROL ▼
  🧠 Learning Archetype
  ⚙️ Subject Settings
  ⚙️ Settings
```

### ⚙️ Admin Sidebar
```
AKGE Learning Platform
[Admin]

SYSTEM CONTROL ▼
  👥 User Management
  🔐 Roles & Permissions
  🛡️ Access Control

DATA & COMPLIANCE ▼
  📋 DPDP Compliance
  🔒 Data Encryption
  📝 Consent Logs

SYSTEM HEALTH ▼
  ⚡ Performance
  🚨 Error Monitoring
  📊 Analytics
  ⚙️ Settings
```

---

## 🎨 Color & Styling

### Sidebar Colors
```
Background:     from-slate-900/95 to-slate-800/95
Border:         border-white/10
Text:           text-gray-300
Hover:          hover:bg-white/10 hover:text-white
Active:         bg-white/20 text-white
```

### Section Headers
```
Text Color:     text-gray-400
Hover:          hover:text-gray-300
Font Size:      text-xs
Font Weight:    font-semibold
Letter Spacing: tracking-wider
```

### Navigation Items
```
Text Color:     text-gray-300
Hover:          hover:bg-white/10 hover:text-white
Padding:        px-4 py-3
Border Radius:  rounded-lg
Transition:     transition-all duration-300
```

### Tooltips
```
Background:     bg-slate-900
Border:         border border-white/20
Border Radius:  rounded-lg
Padding:        px-3 py-2
Opacity:        opacity-0 group-hover:opacity-100
Transition:     transition-opacity duration-300
```

---

## 📊 Component Hierarchy

```
DashboardLayout
├── RoleBasedSidebar
│   ├── Logo Section
│   │   ├── Logo Icon (A)
│   │   └── Logo Text (AKGE)
│   │
│   ├── Role Badge
│   │   └── Role Name (Student, Teacher, etc.)
│   │
│   ├── Navigation
│   │   └── For each section:
│   │       ├── Section Header (Expandable)
│   │       └── Navigation Items
│   │           ├── Icon
│   │           ├── Label
│   │           ├── Description
│   │           └── Tooltip (on hover)
│   │
│   └── Toggle Button
│       └── Collapse/Expand
│
└── Main Content
    ├── Top Bar
    │   ├── Title
    │   ├── Notifications
    │   ├── Settings
    │   ├── User Avatar
    │   └── Logout Button
    │
    └── Page Content
        └── Role-Specific Content
```

---

## 🔄 State Flow

```
User Logs In
    ↓
Role Determined
    ↓
RoleBasedSidebar Renders
    ↓
Navigation Config Loaded
    ↓
Sections Rendered
    ↓
User Interacts
    ├─ Click Toggle → sidebarOpen state changes
    ├─ Click Section → expandedSections state changes
    ├─ Hover Item → Tooltip appears
    └─ Click Item → onNavigate callback fires
```

---

## 🎯 Navigation Flow

```
Sidebar Item Clicked
    ↓
onNavigate Callback
    ↓
href Passed to Callback
    ↓
Application Routes
    ↓
Page Component Loads
    ↓
Content Displays
```

---

## 📐 Dimensions

### Sidebar Widths
```
Expanded:   w-64 (256px)
Collapsed:  w-20 (80px)
```

### Main Content Margin
```
With Sidebar Open:   ml-64 (256px)
With Sidebar Closed: ml-20 (80px)
```

### Item Heights
```
Section Header:  py-2 (8px padding)
Navigation Item: py-3 (12px padding)
Toggle Button:   py-3 (12px padding)
```

### Icon Sizes
```
Logo Icon:       w-10 h-10 (40px)
Navigation Icon: text-lg (18px)
Section Icon:    text-lg (18px)
```

---

## 🎨 Animation Timings

```
Sidebar Toggle:     transition-all duration-300
Hover Effects:      transition-all duration-300
Section Expand:     transition-transform duration-300
Tooltip Fade:       transition-opacity duration-300
```

---

## 📱 Touch Targets

```
Minimum Touch Size: 44px × 44px
Navigation Item:    px-4 py-3 = 48px height
Toggle Button:      px-4 py-3 = 48px height
Section Header:     px-4 py-2 = 32px height (expandable)
```

---

## ♿ Accessibility Features

```
Keyboard Navigation:
  ├─ Tab: Move between items
  ├─ Enter: Activate item
  ├─ Space: Toggle section
  └─ Escape: Close tooltip

Screen Reader:
  ├─ Semantic HTML
  ├─ ARIA Labels
  ├─ Role Attributes
  └─ Alt Text

Visual:
  ├─ Color Contrast: WCAG AA
  ├─ Focus Indicators: Visible
  ├─ Font Size: Readable
  └─ Spacing: Adequate
```

---

## 🚀 Performance Metrics

```
Initial Load:       < 1s
Sidebar Toggle:     < 300ms
Section Expand:     < 300ms
Hover Response:     < 100ms
Tooltip Display:    < 300ms
```

---

## 📊 Data Structure

### Navigation Configuration
```javascript
{
  section: "string",
  items: [
    {
      icon: "emoji",
      label: "string",
      href: "string",
      description: "string"
    }
  ]
}
```

### Component State
```javascript
{
  sidebarOpen: boolean,
  expandedSections: {
    "Section Name": boolean
  },
  role: "student" | "parent" | "teacher" | "management" | "admin" | "investor" | "board"
}
```

---

## 🎯 Usage Example

### Rendering Sidebar
```jsx
<RoleBasedSidebar
  role="student"
  sidebarOpen={true}
  onToggle={() => setSidebarOpen(!sidebarOpen)}
  onNavigate={(href) => console.log('Navigate to:', href)}
/>
```

### Sidebar in Layout
```jsx
<DashboardLayout
  role="student"
  userId="student1"
  onLogout={handleLogout}
>
  <StudentDashboard />
</DashboardLayout>
```

---

**Version**: 1.0.0  
**Status**: ✅ Production Ready  
**Last Updated**: 2024
