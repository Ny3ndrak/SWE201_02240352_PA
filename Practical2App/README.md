# Practical 2: Implement Responsive Layouts and Navigation in React Native

## Student Information
- **Module**: SWE201 - Mobile Application Development
- **Practical**: Practical 2
- **Units Covered**: Units 2 and 3
- **Marks**: 10

## Aim
To design and implement responsive layouts in a React Native application using Expo, and integrate navigation so that the user interface adapts gracefully to different screen sizes and orientations.

## Objectives
By completing this practical, the learner will be able to:

1. Apply Flexbox and layout primitives to create responsive screen designs in React Native
2. Use percentage-based dimensions, flex properties, and scrollable containers to handle varying device sizes
3. Utilize hooks such as `useWindowDimensions` to adjust UI based on runtime screen size
4. Integrate responsive layouts with React Navigation in an Expo project
5. Follow clean coding practices while structuring layout and navigation components

## Learning Outcomes
After completing this practical, the learner should be able to:

1. Create and run a React Native app using Expo that adapts to different screen sizes
2. Design layouts that reflow content using Flexbox (flex, flexDirection, justifyContent, alignItems)
3. Implement scrollable and adaptable screens using ScrollView and responsive containers
4. Integrate navigation between multiple responsive screens
5. Write clean, modular, and readable React Native code with proper separation of layout and navigation concerns

## Features Implemented

### 1. Responsive Layout System
- **Flexbox-based layouts** for flexible and adaptive UI
- **Percentage-based sizing** instead of fixed pixel values
- **Dynamic breakpoints** using `useWindowDimensions`:
  - Mobile: width < 600px
  - Wide: width ≥ 600px
- **Landscape Mode Support**: Detects orientation and adapts layout accordingly

### 2. Navigation Structure
- **Bottom Tab Navigation**: Easy switching between Dashboard and Profile
- **Stack Navigation**: Wraps bottom tabs for future extensibility
- **Modular Architecture**: Separated navigation logic into src folder

### 3. Two Responsive Screens

#### Dashboard Screen
- **Welcome Section**: Dynamic greeting with responsive description text
- **Feature Card**: Highlights responsive capabilities
- **Navigation**: Button to navigate to Profile screen
- **Device Info**: Real-time display of screen dimensions, layout mode (Mobile/Wide/Tablet), and orientation
- **Responsive Layout**: Switches from column (mobile/portrait) to row (wide/landscape)

#### Profile Screen
- **User Profile**: Avatar display with initials "NYZ"
- **Personal Information**: Displays user details:
  - Name: Nyendrak Yoezer Zangmo
  - Email: nyendrak@example.com
  - Phone: +975 17123456
  - Location: Thimphu, Bhutan
- **Navigation**: Button to navigate back to Dashboard
- **Responsive Container**: Adapts width based on screen size
- **Clean Design**: Simplified, easy-to-read layout without emojis

## Tech Stack

- **Framework**: React Native 0.81.5
- **Platform**: Expo SDK 54
- **Language**: TypeScript 5.9.2
- **Navigation**: 
  - `@react-navigation/native` v7
  - `@react-navigation/native-stack` v7
  - `@react-navigation/bottom-tabs` v7
- **UI Components**:
  - `react-native-screens`
  - `react-native-safe-area-context`
  - `react-native-gesture-handler`

## Project Structure

```
Practical2App/
├── App.tsx                           # Main app entry point
├── src/
│   ├── MainStackNavigation.tsx      # Stack navigator setup
│   └── BottomTabs.tsx               # Bottom tab navigator with Dashboard and Profile
├── screens/
│   ├── DashboardScreen.tsx          # Dashboard screen with responsive cards
│   └── ProfileScreen.tsx            # User profile screen
├── assets/                           # Images and resources
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript configuration
├── app.json                          # Expo configuration (orientation: default)
└── README.md                         # This file
```

## Installation

### Prerequisites
- Node.js (latest stable version)
- npm or yarn
- Expo Go app on mobile device (recommended)
- OR Android/iOS emulator

### Steps

1. **Navigate to the project directory**
   ```bash
   cd Practical2App
   ```

2. **Install dependencies** (if not already installed)
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on your preferred platform**
   - **Physical Device**: Scan QR code with Expo Go app
   - **Android Emulator**: Press `a`
   - **iOS Simulator**: Press `i`
   - **Web Browser**: Press `w`

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint for code quality

## Key Concepts Demonstrated

### 1. Responsive Flexbox Layouts
```typescript
const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'column',  // Stack vertically on mobile/portrait
    gap: 12,
  },
  cardContainerWide: {
    flexDirection: 'row',     // Side-by-side on wide/landscape
  },
});
```

### 2. Dynamic Dimension and Orientation Awareness
```typescript
import { useWindowDimensions } from 'react-native';

function MyScreen() {
  const { width, height } = useWindowDimensions();
  const isWide = width >= 600;
  const isLandscape = width > height;
  
  return (
    <View style={[styles.container, isWide && styles.containerWide]}>
      <Text>Mode: {isLandscape ? 'Landscape' : 'Portrait'}</Text>
    </View>
  );
}
```

### 3. ScrollView for Content Overflow
```typescript
<ScrollView contentContainerStyle={styles.scrollContent}>
  <View style={styles.screenContainer}>
    {/* Content that scrolls vertically */}
  </View>
</ScrollView>
```

### 4. Bottom Tab Navigation
```typescript
<Tab.Navigator>
  <Tab.Screen name="Dashboard" component={DashboardScreen} />
  <Tab.Screen name="Profile" component={ProfileScreen} />
</Tab.Navigator>
```

## Testing Responsive Layouts

### Portrait Mode Testing
1. Hold device vertically
2. Observe cards stacking vertically on narrow screens
3. Info box shows "Portrait" mode

### Landscape Mode Testing
1. Rotate device horizontally
2. Layout automatically adapts:
   - Cards appear side-by-side
   - Sections use horizontal layout
   - More efficient use of space
3. Info box shows "Landscape" mode

### Different Screen Sizes
- **Small Phone** (< 600px): Single column layout
- **Tablet/Large Phone** (≥ 600px): Multi-column layout
- **Landscape**: Automatically uses wide layout

## Observations

- **Layout Reflow**: Layouts automatically adjust when device rotates
- **Orientation Detection**: App correctly identifies portrait vs landscape
- **Content Accessibility**: All content remains accessible through scrolling
- **Navigation**: Smooth transitions between tabs
- **Performance**: App runs smoothly in all orientations

## Problems Encountered and Solutions

1. **Issue**: Content overflow on small screens
   - **Solution**: Wrapped all screen content in `ScrollView` with proper content container styling

2. **Issue**: Layout not adapting to landscape
   - **Solution**: Added orientation detection using `width > height` and enabled landscape mode in app.json

3. **Issue**: Navigation complexity with multiple screens
   - **Solution**: Created modular navigation structure in src folder with separate files for MainStackNavigation and BottomTabs

4. **Issue**: Code readability and maintainability
   - **Solution**: Formatted all styles to multi-line format with proper indentation and removed unused styles

5. **Issue**: App locked to portrait mode
   - **Solution**: Changed `app.json` orientation from "portrait" to "default" to allow rotation

## Implementation Details

### File Structure and Code Organization

#### App.tsx
```typescript
import MainStackNavigation from './src/MainStackNavigation';

export default function App() {
  return <MainStackNavigation />;
}
```

#### src/MainStackNavigation.tsx
- Wraps the entire app in a `NavigationContainer`
- Contains a single `Stack.Navigator` with the `BottomTabs` screen
- Provides the foundation for future extensibility

#### src/BottomTabs.tsx
- Creates bottom tab navigation with two tabs: Dashboard and Profile
- Imports `DashboardScreen` and `ProfileScreen` from the screens folder
- Uses icons for better UX (home-outline and person-outline)

#### screens/DashboardScreen.tsx
- Uses `useWindowDimensions` hook to detect screen size and orientation
- Implements responsive breakpoints:
  - `isWide`: width ≥ 600px
  - `isTablet`: width ≥ 768px
  - `isLandscape`: width > height
- Contains:
  - Welcome card with title and description
  - Feature card highlighting responsive design
  - Navigation button to Profile
  - Device info showing dimensions and layout mode
- All styles defined in multi-line format for readability

#### screens/ProfileScreen.tsx
- Displays user profile information with avatar
- Responsive info cards that adapt to screen width
- Implements same responsive breakpoints as Dashboard
- Clean, simple design without unnecessary decorations
- Well-formatted code with multi-line styles

### Responsive Design Implementation

**Breakpoints:**
- Mobile: width < 600px (single column layout)
- Wide: width ≥ 600px (multi-column possible)
- Tablet: width ≥ 768px (optimized for larger screens)

**Orientation Handling:**
- Portrait: height > width
- Landscape: width > height
- Dynamic layout adjustments based on orientation

**Layout Pattern:**
```typescript
const { width, height } = useWindowDimensions();
const isWide = width >= 600;
const isTablet = width >= 768;
const isLandscape = width > height;

// Apply conditional styles
<View style={[
  styles.container,
  isWide && styles.containerWide,
  isTablet && styles.containerTablet
]}>
```

### Code Quality Features

1. **TypeScript**: Full type safety throughout the application
2. **Clean Code**: Well-formatted, readable code with consistent styling
3. **No Unused Code**: Removed all unused styles and components
4. **Modular Structure**: Separated navigation logic from screens
5. **Consistent Naming**: Clear, descriptive names for all components and styles
6. **Multi-line Styles**: All StyleSheet objects formatted with proper indentation

## What Has Been Completed

✅ **Project Setup**
- Created Practical2App with TypeScript and Expo
- Installed all required dependencies for React Navigation
- Configured app.json for landscape support

✅ **Navigation Structure**
- Implemented modular navigation in src folder
- Created MainStackNavigation.tsx for stack navigation
- Created BottomTabs.tsx with Dashboard and Profile tabs
- Integrated navigation with proper typing

✅ **Responsive Screens**
- Implemented DashboardScreen with responsive layout
- Implemented ProfileScreen with user information
- Both screens adapt to portrait and landscape modes
- Real-time dimension and orientation detection

✅ **Code Quality**
- Formatted all code for maximum readability
- Removed unused styles and components
- Multi-line style formatting throughout
- Removed unnecessary decorations (emojis)
- Clean, professional design

✅ **Testing**
- Verified landscape mode functionality
- Tested responsive breakpoints
- Confirmed navigation between screens
- Validated TypeScript compilation

## Conclusion

This practical successfully demonstrates the implementation of responsive layouts in React Native using Expo. The application adapts seamlessly to different screen sizes and orientations through:

- **Flexbox-based responsive layouts** with dynamic breakpoints
- **Dynamic dimension and orientation detection** with `useWindowDimensions`
- **ScrollView** for content overflow handling
- **Bottom tab navigation** for easy screen switching
- **Clean, modular code structure** with TypeScript
- **Multi-line formatted styles** for maintainability

The app works perfectly in both **portrait and landscape modes**, with two fully functional screens (Dashboard and Profile) that demonstrate best practices in responsive design and navigation.

## References

- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation Documentation](https://reactnavigation.org/)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [React Native useWindowDimensions](https://reactnative.dev/docs/usewindowdimensions)

---

**Student Name**: Nyendrak Yoezer Zangmo  
**Student ID**: 02240352  
**Date**: April 21, 2026  
**Module Code**: SWE201

## Learning Outcomes
After completing this practical, the learner should be able to:

1. Create and run a React Native app using Expo that adapts to different screen sizes
2. Design layouts that reflow content using Flexbox (flex, flexDirection, justifyContent, alignItems)
3. Implement scrollable and adaptable screens using ScrollView and responsive containers
4. Integrate navigation between multiple responsive screens
5. Write clean, modular, and readable React Native code with proper separation of layout and navigation concerns

## Features Implemented

### 1. Responsive Layout System
- **Flexbox-based layouts** for flexible and adaptive UI
- **Percentage-based sizing** instead of fixed pixel values
- **Dynamic breakpoints** using `useWindowDimensions`:
  - Mobile: width < 600px
  - Wide: width ≥ 600px
  - Tablet: width ≥ 768px

### 2. Four Navigable Screens

#### Dashboard Screen
- Stats cards displaying key metrics
- Responsive card container that switches from column (mobile) to row (wide screens)
- Activity list and quick actions
- Navigation buttons to all other screens
- Real-time screen dimension display

#### Profile Screen
- User profile header with avatar
- Info cards for user information and preferences
- Activity statistics grid
- Responsive layout that adapts to screen width
- Navigation to other screens

#### Home Screen
- Hero section with welcome message
- Feature cards with icons
- Content grid for recent updates
- Quick links section
- Device information display
- Landscape/Portrait detection

#### Details Screen
- Tabbed navigation (Overview, Specifications, History)
- System status cards
- Performance metrics
- Technical specifications
- Activity timeline
- State management with `useState`

### 3. Navigation Implementation
- **React Navigation** with Native Stack Navigator
- Seamless navigation between all screens
- Consistent header styling
- Back navigation support
- Custom navigation options per screen

### 4. Responsive Design Patterns

#### ScrollView Integration
All screens use `ScrollView` with `contentContainerStyle` for:
- Vertical scrolling on smaller devices
- Preventing content cutoff
- Smooth scrolling experience

#### Conditional Styling
```typescript
const { width, height } = useWindowDimensions();
const isWide = width >= 600;
const isTablet = width >= 768;

<View style={[styles.container, isWide && styles.containerWide]}>
```

#### Flexible Grids
- Cards and sections automatically reflow based on screen size
- Uses `flexDirection: 'column'` on mobile
- Switches to `flexDirection: 'row'` on wider screens

## Tech Stack

- **Framework**: React Native 0.81.5
- **Platform**: Expo SDK 54
- **Language**: TypeScript 5.9.2
- **Navigation**: React Navigation v7
  - `@react-navigation/native`
  - `@react-navigation/native-stack`
- **UI Components**:
  - `react-native-screens`
  - `react-native-safe-area-context`
  - `react-native-gesture-handler`

## Project Structure

```
Practical2App/
├── App.tsx                    # Main app entry with navigation setup
├── screens/
│   ├── DashboardScreen.tsx   # Dashboard with stats and metrics
│   ├── ProfileScreen.tsx     # User profile and preferences
│   ├── HomeScreen.tsx        # Home screen with features
│   └── DetailsScreen.tsx     # Detailed view with tabs
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript configuration
├── app.json                  # Expo configuration
└── README.md                 # This file
```

## Installation

### Prerequisites
- Node.js (latest stable version)
- npm or yarn
- Expo Go app on mobile device (recommended)
- OR Android/iOS emulator

### Steps

1. **Clone or navigate to the project directory**
   ```bash
   cd Practical2App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on your preferred platform**
   - **Physical Device**: Scan QR code with Expo Go app
   - **Android Emulator**: Press `a`
   - **iOS Simulator**: Press `i`
   - **Web Browser**: Press `w`

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint for code quality

## Key Concepts Demonstrated

### 1. Responsive Flexbox Layouts
```typescript
const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'column',  // Stack vertically on mobile
    gap: 16,
  },
  cardContainerWide: {
    flexDirection: 'row',     // Side-by-side on wide screens
  },
});
```

### 2. Dynamic Dimension Awareness
```typescript
import { useWindowDimensions } from 'react-native';

function MyScreen() {
  const { width, height } = useWindowDimensions();
  const isWide = width >= 600;
  
  return (
    <View style={[styles.container, isWide && styles.containerWide]}>
      {/* Content */}
    </View>
  );
}
```

### 3. ScrollView for Content Overflow
```typescript
<ScrollView contentContainerStyle={styles.scrollContent}>
  <View style={styles.screenContainer}>
    {/* Long content that scrolls */}
  </View>
</ScrollView>
```

### 4. Navigation Integration
```typescript
<TouchableOpacity onPress={() => navigation.navigate('Profile')}>
  <Text>Go to Profile</Text>
</TouchableOpacity>
```

## Testing Responsive Layouts

1. **Test on Different Devices**
   - Small phone (< 600px width)
   - Tablet or large phone (≥ 600px width)
   - Tablet landscape mode (≥ 768px width)

2. **Observe Layout Changes**
   - Cards stack vertically on narrow screens
   - Cards appear side-by-side on wide screens
   - Navigation buttons adjust their layout
   - Screen dimension info updates in real-time

3. **Test Scrolling**
   - All content should be accessible via scrolling
   - No content should be cut off or inaccessible

4. **Test Navigation**
   - Navigate between all screens
   - Use back buttons and native navigation
   - Ensure smooth transitions

## Common Responsive Patterns Used

1. **Conditional Layout Direction**
   - Mobile: `flexDirection: 'column'`
   - Wide: `flexDirection: 'row'`

2. **Flexible Sizing**
   - `flex: 1` for equal distribution
   - Percentage-based widths
   - Dynamic padding and margins

3. **Breakpoint-Based Styling**
   - 600px breakpoint for wide screens
   - 768px breakpoint for tablet screens

4. **Content Adaptation**
   - Show/hide elements based on screen size
   - Adjust font sizes for readability
   - Modify spacing for better UX

## Observations

- **Layout Reflow**: Layouts automatically adjust when screen width changes
- **Content Accessibility**: All content remains accessible through scrolling
- **Navigation Flow**: Smooth transitions between screens without errors
- **Performance**: App runs smoothly on both small and large devices
- **Visual Consistency**: Maintains design coherence across different screen sizes

## Problems Encountered and Solutions

1. **Issue**: Content overflow on small screens
   - **Solution**: Wrapped all screen content in `ScrollView`

2. **Issue**: Fixed pixel values breaking layouts
   - **Solution**: Used flex properties and percentage-based dimensions

3. **Issue**: Different layouts for different screen sizes
   - **Solution**: Implemented breakpoint system using `useWindowDimensions`

4. **Issue**: Maintaining navigation state
   - **Solution**: React Navigation handles state automatically

## Conclusion

This practical successfully demonstrates the implementation of responsive layouts in React Native using Expo. The application adapts seamlessly to different screen sizes through:

- Flexbox-based responsive layouts
- Dynamic dimension detection with `useWindowDimensions`
- ScrollView for content overflow handling
- Proper navigation integration with React Navigation
- Clean, modular code structure with TypeScript

The skills acquired in this practical are essential for building modern, cross-platform mobile applications that provide consistent user experiences across diverse devices and screen sizes.

## References

- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation Documentation](https://reactnavigation.org/)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [React Native useWindowDimensions](https://reactnative.dev/docs/usewindowdimensions)

---

**Student Name**: [Your Name]  
**Student ID**: [Your Student ID]  
**Date**: April 21, 2026  
**Module Code**: SWE201

## Project Structure

```
Practical2App/
├── screens/                  # Screen components
│   ├── DashboardScreen.tsx  # Main dashboard
│   ├── ProfileScreen.tsx    # User profile
│   ├── HomeScreen.tsx       # Home features
│   └── DetailsScreen.tsx    # Detailed information
├── App.tsx                  # Main app with navigation
├── app.json                 # Expo configuration
├── assets/                  # Images and icons
└── Documentation files
```

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

## Running the App

### Web Browser (Quickest)
Press `w` in the terminal to open in browser, then use DevTools to test different screen sizes.

### Physical Device
1. Install **Expo Go** app on your phone
2. Scan the QR code displayed in the terminal

### Emulator/Simulator
- **Android**: Press `a` in the terminal
- **iOS**: Press `i` in the terminal (Mac only)

## Responsive Design Implementation

### Breakpoints
- **Mobile**: < 600px width (vertical layout)
- **Wide**: ≥ 600px width (horizontal layout)
- **Tablet**: ≥ 768px width (optimized spacing)

### Key Techniques
- **useWindowDimensions** hook for real-time screen size tracking
- **Flexbox** layouts with conditional `flexDirection`
- **ScrollView** for vertical content overflow
- **Conditional styling** based on breakpoints

## Screens Overview

### 1. Dashboard
Main overview with statistics cards, activity feed, and navigation to all screens.

### 2. Profile
User profile with personal information, preferences, and activity statistics.

### 3. Home
Feature showcase with hero section, recent updates, and quick links.

### 4. Details
Detailed information with tabbed navigation (Overview, Specifications, History).

## Navigation

All screens are connected via React Navigation Stack Navigator:
- Forward navigation using button presses
- Back navigation via header or custom back buttons
- Maintains navigation history

## Technologies

- React Native 0.81.5
- Expo ~54.0
- React Navigation 7.x
- TypeScript 5.x

## License

Educational project for SWE201 coursework.

