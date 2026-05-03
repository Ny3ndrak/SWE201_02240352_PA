# Student Planner 📱

> **A simple productivity app with smooth animations and task management**

Student ID: 02240352 | Module: SWE201 | Assignment 2

---

## 🚀 Quick Start

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

## 📋 What's Inside

**8 Fully Functional Screens:**
- 🏠 Home - Dashboard with shortcuts
- ✅ Tasks - Todo list with priorities
- 📅 Schedule - Study timetable
- 📝 Notes - Quick note-taking
- 🎯 Goals - Progress tracking
- ⚡ Animation Demo - Interactive showcase
- ⚙️ Settings - App preferences
- 📋 Task Details - Detailed view

**Key Features:**
- ✨ 6+ different animations (fade, scale, slide, rotate, progress, drag)
- 🎯 Gesture interactions (drag & drop, swipe, scroll)
- 🎨 Light/Dark mode with smooth transitions
- 📱 Responsive design for all screen sizes
- 🧩 10+ reusable components
- 🔄 Stack + Tab navigation
- 🎭 Professional UI/UX design

---

## 🎬 Animations Implemented

1. **Fade In/Out** - Smooth opacity transitions
2. **Scale & Bounce** - Spring-based animations
3. **Slide** - Directional movement with stagger
4. **Rotation** - 360° spin animations
5. **Progress Bar** - Color interpolation
6. **Pulse** - Continuous loop effect
7. **Drag Gesture** - PanResponder with spring-back

---

## 📂 Project Structure

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

## 🎯 Assignment Requirements

✅ Multi-screen navigation (Stack + Tabs)  
✅ 5+ screens (implemented 8)  
✅ 2+ animations (implemented 6+)  
✅ 1+ gesture (implemented 2)  
✅ Reusable components (created 10+)  
✅ Responsive layout  
✅ No backend/API calls  
✅ Professional UI/UX  

---

## 🛠️ Tech Stack

- **Framework**: React Native + Expo
- **Language**: TypeScript
- **Navigation**: React Navigation (Stack + Bottom Tabs)
- **Animations**: React Native Animated API
- **Icons**: @expo/vector-icons
- **Gestures**: PanResponder

---

## 📱 Features Showcase

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

## 📖 Documentation

For detailed documentation including:
- Screen descriptions
- Animation technical details
- Navigation flow diagrams
- Code organization
- Design decisions

See [ASSIGNMENT_DOCUMENTATION.md](./ASSIGNMENT_DOCUMENTATION.md)

---

## 🎓 Learning Outcomes

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

## 📸 Screenshots

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

## 🚀 Development

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

## 📝 Notes

- All data is mock/local (no backend)
- Works on iOS and Android
- Optimized for performance
- Production-ready code structure

---

## 👨‍💻 About

Created for SWE201 Assignment 2  
Student ID: 02240352  
Date: May 3, 2026

**Made with ❤️ for students**

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

## Installation

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- Expo Go app on your mobile device (optional, for testing on physical device)
- Android Studio (for Android emulator) or Xcode (for iOS simulator)

### Steps to Install

1. **Navigate to the project directory**:
   ```bash
   cd Campus_Companion
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
   or using yarn:
   ```bash
   yarn install
   ```

3. **Wait for installation to complete** (this may take a few minutes)

## Running the App

### Start the Development Server

```bash
npm start
```
or using npx:
```bash
npx expo start
```

This will start the Expo development server and display a QR code in your terminal.

### Run on Different Platforms

#### Android Emulator
```bash
npm run android
```
or press `a` in the terminal after running `npm start`

**Prerequisites**: Android Studio with an Android Virtual Device (AVD) configured

#### iOS Simulator (macOS only)
```bash
npm run ios
```
or press `i` in the terminal after running `npm start`

**Prerequisites**: Xcode installed on macOS

#### Physical Device
1. Install **Expo Go** app from Google Play Store or Apple App Store
2. Run `npm start`
3. Scan the QR code displayed in the terminal using:
   - **Android**: Expo Go app
   - **iOS**: Camera app (will open in Expo Go)

#### Web Browser
```bash
npm run web
```
or press `w` in the terminal after running `npm start`

**Note**: Some mobile-specific features may not work in web mode

### Clear Cache (if needed)

If you encounter issues, try clearing the cache:
```bash
npx expo start --clear
```
or
```bash
npm start -- --clear
```

## Features Implemented

### Functional Requirements

1. **Multiple Screens (4+)**
   - Home Screen: App title and navigation entry points
   - Contacts Screen: Important campus contacts using FlatList
   - Schedule Screen: Weekly class timetable overview
   - Notice Board: Campus announcements and notices
   - Contact Detail Screen: Detailed contact information

2. **Navigation**
   - Stack Navigator for screen transitions
   - Bottom Tab Navigator for main app sections
   - Parameter passing from Contacts to Contact Details screen

3. **Styling & Layout**
   - StyleSheet API (no inline styles)
   - Flexbox layout throughout
   - Dynamic theme switching (light/dark mode)
   - Platform-specific optimizations using Platform.select

4. **Responsive Design**
   - Dimensions API for screen size detection
   - Percentage-based and flex layouts
   - ScrollView/FlatList for scrollable content
   - Adaptive layouts for different screen sizes

### Technical Highlights

- **TypeScript**: Type-safe code throughout the application
- **Theme System**: Custom theme provider with light/dark mode support
- **Responsive Utilities**: Helper functions for responsive sizing (wp, hp, scale)
- **Performance Optimization**: FlatList optimizations for large lists
- **Code Organization**: Clear separation of concerns with screens, navigation, and components

## Known Issues and Limitations

1. **Static Data**: Currently uses hardcoded data for contacts, schedules, and notices
   - Future enhancement: Integrate with backend API

2. **Limited Error Handling**: Basic error handling for linking actions
   - Future enhancement: Comprehensive error boundaries

3. **Theme Persistence**: Theme preference is not persisted across app restarts
   - Future enhancement: Use AsyncStorage to save theme preference

4. **Offline Mode**: No offline data caching
   - Future enhancement: Implement offline-first architecture

5. **Accessibility**: Basic accessibility support
   - Future enhancement: Enhanced screen reader support and accessibility labels

## Technologies Used

- **React Native**: 0.81.5
- **Expo**: ~54.0.0
- **React Navigation**: 6.x
  - Stack Navigator
  - Bottom Tab Navigator
- **TypeScript**: 5.3.0
- **React**: 19.1.0

## Development Notes

### Theme System
The app uses a custom theme system with:
- Light and dark color schemes
- Responsive font sizes
- Consistent spacing and shadows
- Easy theme switching via ThemeContext

### Navigation Structure
```
Stack Navigator (Root)
├── Home Screen
├── Main Tabs (Bottom Tab Navigator)
│   ├── Contacts Tab
│   ├── Schedule Tab
│   └── Notice Tab
└── Contact Detail Screen
```


