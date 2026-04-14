# Campus Companion

A comprehensive React Native mobile application designed to help students quickly access key campus information. Built with Expo and React Navigation, this app provides an intuitive interface for viewing important contacts, class schedules, and campus notices.

## App Overview

Campus Companion is a multi-screen mobile application that demonstrates core React Native concepts including:

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

### Component Hierarchy
- App.tsx wraps the entire app with ThemeProvider
- AppNavigator sets up the navigation structure
- Individual screens use theme context for consistent styling

## Assignment Requirements Met

- Minimum 4 screens implemented (5 total)
- Stack Navigator + Bottom Tab Navigator
- Parameter passing between screens (Contacts → Contact Detail)
- StyleSheet and Flexbox for all layouts
- Dynamic styling (theme toggle)
- Platform-specific styles using Platform API
- Dimensions API for responsive design
- ScrollView and FlatList for scrollable content
- Clean code organization with separate folders
- TypeScript for type safety
- Comprehensive README with installation and running instructions

## Author

**Student Name**: [Your Name]  
**Student ID**: [Your Student ID]  
**Module**: SWE201 – Cross Platform Development  
**Institution**: College of Science and Technology, Royal University of Bhutan

## License

This project is created for academic purposes as part of the SWE201 course assignment.

---

**Last Updated**: April 14, 2026
