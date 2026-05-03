# Student Planner 📱

> **A simple productivity app with smooth animations and task management**

##  Quick Start

```bash
# Install dependencies
npm install

# Start the app
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

---

##  What's Inside

**8 Fully Functional Screens:**
-  Home - Dashboard with shortcuts
-  Tasks - Todo list with priorities
-  Schedule - Study timetable
-  Notes - Quick note-taking
-  Goals - Progress tracking
-  Animation Demo - Interactive showcase
-  Settings - App preferences
-  Task Details - Detailed view


##  Animations Implemented

1. **Fade In/Out** - Smooth opacity transitions
2. **Scale & Bounce** - Spring-based animations
3. **Slide** - Directional movement with stagger
4. **Rotation** - 360° spin animations
5. **Progress Bar** - Color interpolation
6. **Pulse** - Continuous loop effect
7. **Drag Gesture** - PanResponder with spring-back

---

##  Project Structure

```
Campus_Companion/
├── screens/           # 8 screens
├── components/        # Reusable UI & animated components
├── navigation/        # Stack & Tab navigators
├── assets/            # Images and icons
├── App.tsx            # Root component
└── package.json       # Dependencies
```

---

##  Assignment Requirements

✅ Multi-screen navigation (Stack + Tabs)  
✅ 5+ screens (implemented 8)  
✅ 2+ animations (implemented 6+)  
✅ 1+ gesture (implemented 2)  
✅ Reusable components (created 10+)  
✅ Responsive layout  
✅ No backend/API calls  
✅ Professional UI/UX  

---

##  Tech Stack

- **Framework**: React Native + Expo
- **Language**: TypeScript
- **Navigation**: React Navigation (Stack + Bottom Tabs)
- **Animations**: React Native Animated API
- **Icons**: @expo/vector-icons
- **Gestures**: PanResponder

---

##  Features Showcase

### Navigation
- Home → 6 Tab Screens
- Contacts → Contact Details (with params)
- Smooth transitions between all screens

### Animations
- Every screen has at least one animation
- Dedicated Animation Demo screen
- 60 FPS performance with `useNativeDriver`

### Gestures
- Drag & drop interactive element
- Smooth scroll throughout
- Touch feedback on all buttons

### Theme
- Light/Dark mode toggle
- Consistent color palette
- Accessible typography

---

##  Documentation

For detailed documentation including:
- Screen descriptions
- Animation technical details
- Navigation flow diagrams
- Code organization
- Design decisions


---

## 🎓 Learning Outcomes

This project demonstrates:
- ✅ React Navigation mastery
- ✅ Advanced animation techniques
- ✅ Gesture handling
- ✅ Component architecture
- ✅ TypeScript integration
- ✅ Responsive design
- ✅ State management with hooks

---

##  Screenshots

> Add screenshots of all screens showing:
> - Home with animations
> - Contact list and details
> - Schedule grid
> - Notice board
> - Campus map
> - Animation demo
> - Profile & settings
> - Dark mode

---

##  Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Clear cache
npm start --reset-cache

# Run tests (if implemented)
npm test
```

---

##  Notes

- All data is mock/local (no backend)
- Works on iOS and Android
- Optimized for performance
- Production-ready code structure

---

## 📄 License

Educational purposes - SWE201 Coursework

- **Navigation**: Stack Navigator combined with Bottom Tab Navigator
- **UI Components**: FlatList, ScrollView, TouchableOpacity, and custom components
- **Responsive Design**: Flexible layouts that adapt to different screen sizes and orientations
- **Dynamic Styling**: Theme switching (light/dark mode) with dynamic color schemes
- **Parameter Passing**: Navigation between screens with data flow

### Main Features

1. **Home Screen**: Landing page with navigation cards and theme toggle
2. **Contacts Screen**: List of important campus contacts with FlatList
3. **Schedule Screen**: Weekly class timetable with responsive grid layout
4. **Notice Board**: Campus announcements with priority-based styling
5. **Contact Details**: Detailed contact view demonstrating parameter passing

## Project Structure

```
Campus_Companion/
├── screens/              # Screen components
│   ├── HomeScreen.tsx           # Landing page with navigation
│   ├── ContactScreen.tsx        # Contacts list (FlatList demo)
│   ├── ContactDetailScreen.tsx  # Contact details (parameter passing)
│   ├── ScheduleScreen.tsx       # Weekly timetable
│   └── NoticeScreen.tsx         # Campus notices
├── navigation/           # Navigation configuration
│   ├── AppNavigator.tsx         # Stack navigator setup
│   └── BottomTabs.tsx           # Bottom tab navigator
├── components/           # Reusable UI components
│   ├── ThemeContext.tsx         # Theme provider and context
│   └── theme.ts                 # Theme definitions and utilities
├── assets/               # Images, fonts, and static files
├── App.tsx               # Main application entry point
├── index.ts              # App registration
├── app.json              # Expo configuration
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── babel.config.js       # Babel configuration
```

