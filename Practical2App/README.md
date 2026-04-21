# Practical 2: Responsive Layouts and Navigation in React Native

**Student Name**: Nyendrak Yoezer Zangmo  
**Student ID**: 02240352  
**Module Code**: SWE201  
**Date**: April 21, 2026

## Aim
Design and implement responsive layouts in a React Native application using Expo that adapts gracefully to different screen sizes and orientations.

## Features

### Responsive Layout System
- Flexbox-based layouts with dynamic breakpoints
- `useWindowDimensions` hook for real-time screen size tracking
- Supports portrait and landscape orientations
- Breakpoints: Mobile (< 600px), Wide (≥ 600px), Tablet (≥ 768px)

### Two Responsive Screens

**Dashboard Screen**
- Welcome section with dynamic content
- Feature cards highlighting responsive capabilities
- Real-time device info (dimensions, layout mode, orientation)
- Adaptive layout (column on mobile, row on wide screens)

**Profile Screen**
- User profile with avatar (initials "NYZ")
- Personal information display
- Responsive info cards that adapt to screen width
- Clean, professional design

### Navigation
- Bottom Tab Navigation between Dashboard and Profile
- Stack Navigation for extensibility
- Modular architecture in src folder

## Tech Stack
- React Native 0.81.5
- Expo SDK 54
- TypeScript 5.9.2
- React Navigation v7 (native, native-stack, bottom-tabs)

## Project Structure
```
Practical2App/
├── App.tsx                        # Main app entry
├── src/
│   ├── MainStackNavigation.tsx   # Stack navigator
│   └── BottomTabs.tsx            # Tab navigator
├── screens/
│   ├── DashboardScreen.tsx       # Dashboard screen
│   └── ProfileScreen.tsx         # Profile screen
├── app.json                       # Expo config (orientation: default)
└── package.json                   # Dependencies
```

## Installation & Running

1. **Install dependencies:**
   ```bash
   cd Practical2App
   npm install
   ```

2. **Start development server:**
   ```bash
   npm start
   ```

3. **Run on platform:**
   - Physical Device: Scan QR code with Expo Go app
   - Android: Press `a`
   - iOS: Press `i`
   - Web: Press `w`

## Key Implementation

### Responsive Breakpoints
```typescript
const { width, height } = useWindowDimensions();
const isWide = width >= 600;
const isTablet = width >= 768;
const isLandscape = width > height;
```

### Conditional Styling
```typescript
<View style={[
  styles.container,
  isWide && styles.containerWide,
  isTablet && styles.containerTablet
]}>
```

### ScrollView for Overflow
All screens wrapped in `ScrollView` with `contentContainerStyle` for proper content handling.

## Responsive Design Patterns
- Conditional `flexDirection`: column (mobile) → row (wide)
- Percentage-based dimensions instead of fixed pixels
- Dynamic padding and spacing based on screen size
- Orientation detection for layout adaptation

## Testing
- **Portrait Mode**: Cards stack vertically, info shows "Portrait"
- **Landscape Mode**: Cards display side-by-side, info shows "Landscape"
- **Screen Sizes**: Layout adapts from mobile (< 600px) to tablet (≥ 768px)
- **Navigation**: Smooth transitions between tabs

## Problems & Solutions
1. **Content overflow** → Wrapped in ScrollView
2. **Layout not adapting to landscape** → Added orientation detection, enabled in app.json
3. **Navigation complexity** → Modular structure in src folder
4. **Code maintainability** → Multi-line style formatting, removed unused code

## Conclusion
Successfully implemented responsive layouts that adapt to different screen sizes and orientations using Flexbox, `useWindowDimensions`, ScrollView, and React Navigation. The app demonstrates best practices in responsive design with clean, modular TypeScript code.

## References
- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

