# Campus Companion - Student Productivity App

## Assignment 2: Animation and Multiscreen App
**Module:** SWE201 - BE Software Engineering  
**Student ID:** 02240352  
**Date:** May 3, 2026

---

## 📱 Project Overview

**Campus Companion** is a modern, feature-rich mobile productivity app designed specifically for students. Built with React Native and Expo, it provides a seamless experience for managing campus life, including accessing important contacts, viewing schedules, checking notices, navigating campus locations, and exploring animation capabilities.

### App Concept

The app serves as a one-stop solution for students to:
- **Access Important Contacts**: Quickly find contact information for faculty, administration, and services
- **View Class Schedule**: See weekly timetable with class details
- **Check Notices**: Stay updated with campus announcements and events
- **Navigate Campus**: Access campus maps and location information
- **Explore Animations**: Experience smooth animations and gesture interactions
- **Manage Profile**: View student information and customize app settings

---

## ✨ Key Features

### 1. **Multi-Screen Navigation**
- ✅ **Stack Navigation**: Home screen navigates to main app sections
- ✅ **Bottom Tab Navigation**: 6 tabs for main features
- ✅ **Detail Navigation**: Contact cards navigate to detail screens with parameter passing

### 2. **Responsive UI Design**
- Adapts to different screen sizes
- Uses Dimensions API for dynamic sizing
- Consistent theming throughout the app
- Light/Dark mode support with toggle
- Professional color scheme and typography

### 3. **Rich Animations** (Assignment Requirement: 2+ animations)
Implemented **6 different animation types**:

1. **Fade In/Out Animation** (HomeScreen)
   - Welcome message and header fade in on mount
   - Smooth opacity transitions

2. **Scale & Bounce Animation** (HomeScreen, AnimationDemoScreen)
   - Navigation cards scale up when appearing
   - Spring-based bounce effects on interactions

3. **Slide Animation** (HomeScreen, AnimationDemoScreen)
   - Cards slide in from bottom with stagger effect
   - Horizontal slide animation demo

4. **Rotation Animation** (AnimationDemoScreen)
   - 360-degree rotation with smooth transitions

5. **Progress Bar Animation** (AnimationDemoScreen)
   - Animated loading indicator with color interpolation
   - Smooth width expansion

6. **Continuous Pulse Animation** (AnimationDemoScreen)
   - Icon pulsing effect that loops continuously
   - Visual attention grabber

### 4. **Gesture Interactions** (Assignment Requirement: 1+ gesture)
Implemented **2 gesture types**:

1. **Drag & Drop Gesture** (AnimationDemoScreen)
   - Uses PanResponder for touch tracking
   - Element can be dragged anywhere on screen
   - Spring-back animation when released
   - Visual feedback (color change) while dragging

2. **Touch & Swipe** (Throughout app)
   - Smooth scroll gestures on all list views
   - Pull-to-refresh capability (standard React Native)
   - Swipeable cards and interactive elements

### 5. **Reusable Components** (Assignment Requirement: 1+ reusable)
Created **9 reusable components**:

**Animated Components** (`components/AnimatedComponents.tsx`):
1. `FadeInView` - Automatic fade-in animation wrapper
2. `ScaleInView` - Scale animation wrapper
3. `SlideInView` - Directional slide animation wrapper
4. `PulseView` - Continuous pulse animation wrapper
5. `BounceButton` - Interactive bounce on press

**UI Components** (`components/ReusableComponents.tsx`):
6. `Card` - Styled card container
7. `IconCard` - Card with icon, title, and description
8. `Badge` - Colored label for categorization
9. `SectionHeader` - Consistent section headers
10. `EmptyState` - Empty state display

### 6. **Screen Transition Animations**
- Smooth stack navigation transitions
- Tab switching with native animations
- Modal slide-up transitions (NoticeScreen)
- Card press animations with scale feedback

---

## 📂 Project Structure

```
Campus_Companion/
├── App.tsx                      # Root component with theme provider
├── index.ts                     # Entry point
├── app.json                     # Expo configuration
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript configuration
│
├── components/                  # Reusable components
│   ├── AnimatedComponents.tsx   # 5 reusable animated components
│   ├── ReusableComponents.tsx   # 5 reusable UI components
│   ├── theme.ts                 # Theme color and style definitions
│   └── ThemeContext.tsx         # Theme provider with dark mode
│
├── navigation/                  # Navigation configuration
│   ├── AppNavigator.tsx         # Stack navigator (root)
│   └── BottomTabs.tsx           # Bottom tab navigator (6 tabs)
│
├── screens/                     # All app screens
│   ├── HomeScreen.tsx           # Landing page with animated cards
│   ├── ContactScreen.tsx        # Contact list with search
│   ├── ContactDetailScreen.tsx  # Contact details
│   ├── ScheduleScreen.tsx       # Weekly timetable
│   ├── NoticeScreen.tsx         # Notices with modal detail view
│   ├── CampusMapScreen.tsx      # Campus maps and locations
│   ├── AnimationDemoScreen.tsx  # Animation showcase
│   └── ProfileScreen.tsx        # User profile and settings
│
└── assets/                      # Images and icons
```

---

## 🎯 Assignment Requirements Checklist

### Required Screens ✅ (5/5)
- ✅ Home Screen - Welcome screen with navigation cards
- ✅ Category/Menu Screen - Bottom tab navigation with 6 categories
- ✅ Detail Screen - ContactDetailScreen with parameter passing
- ✅ Profile/Settings Screen - User profile with theme toggle
- ✅ Animation Demo Screen - Comprehensive animation showcase

### Functional Requirements ✅ (9/9)
- ✅ Multi-screen navigation using React Navigation
- ✅ Stack navigation flow (Home → Tabs → Details)
- ✅ Bottom Tab navigation (6 tabs)
- ✅ Responsive layout (Dimensions API, Flexbox)
- ✅ 2+ animations using Animated API (**6 implemented**)
- ✅ 1+ gesture interaction (**2 implemented**: drag, swipe)
- ✅ 1+ screen transition animation (multiple transitions)
- ✅ 1+ reusable component (**10 components created**)
- ✅ No backend/API (all data is local/mock)

### Animation Requirements ✅ (6/6 types implemented)
- ✅ Fade in/out animation
- ✅ Slide animation between views
- ✅ Scale/bounce animation
- ✅ Card transition animation
- ✅ Gesture-driven draggable element
- ✅ Animated progress/loading indicator

### UI & Design Requirements ✅
- ✅ Consistent colors, spacing, typography
- ✅ Mobile UI best practices followed
- ✅ Clean and attractive design
- ✅ Thoughtful UX design (search, filters, modals)
- ✅ Icons and visual indicators throughout
- ✅ Dark mode support

### Technical Requirements ✅
- ✅ Well-structured React Native project
- ✅ Component-based architecture
- ✅ Proper use of props and state
- ✅ Navigation separated from screens
- ✅ Reusable and readable code
- ✅ TypeScript for type safety
- ✅ Meaningful comments and documentation

---

## 🎨 Design Features

### Color Palette
- **Primary**: #4A90E2 (Blue)
- **Accent**: #7B68EE (Purple)
- **Success**: #4ECDC4 (Teal)
- **Warning**: #FFD93D (Yellow)
- **Error**: #FF6B6B (Red)
- **Light/Dark themes** with automatic color switching

### Typography
- **Font Sizes**: Responsive sizing (xs, sm, md, lg, xl, xxl)
- **Font Weights**: 400, 500, 600, 700
- **Consistent spacing** throughout

### UI Patterns
- **Card-based design** for content organization
- **Badge system** for categorization
- **Modal overlays** for detailed views
- **Empty states** with helpful messages
- **Loading indicators** for async operations
- **Icon system** using @expo/vector-icons

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Installation Steps

1. **Navigate to project directory**
   ```bash
   cd Campus_Companion
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   npx expo start
   ```

4. **Run on device/emulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app (physical device)

### Dependencies
```json
{
  "expo": "~54.0.0",
  "react": "19.1.0",
  "react-native": "0.81.5",
  "@react-navigation/native": "^6.1.9",
  "@react-navigation/stack": "^6.3.20",
  "@react-navigation/bottom-tabs": "^6.5.11",
  "@expo/vector-icons": "^14.0.0",
  "react-native-gesture-handler": "~2.28.0",
  "react-native-screens": "~4.16.0",
  "react-native-safe-area-context": "~5.6.0"
}
```

---

## 📱 Screen Descriptions

### 1. Home Screen
**Purpose**: Landing page and navigation hub

**Features**:
- Animated welcome header with pulse effect
- 5 navigation cards with icons
- Fade-in and scale animations on mount
- Staggered card appearance
- Direct navigation to all main sections

**Animations Used**:
- Fade in (opacity)
- Scale spring animation
- Stagger animation for cards
- Card slide-up effect

---

### 2. Contacts Screen
**Purpose**: Directory of important campus contacts

**Features**:
- Searchable contact list
- Contact cards with avatar, name, role, category
- Category badges for organization
- Real-time search filtering
- Navigation to detail screen with data passing
- Empty state when no results

**Data Categories**:
- Administration
- Academic
- Technical Support
- Student Services
- Emergency Services

---

### 3. Contact Detail Screen
**Purpose**: Detailed contact information

**Features**:
- Large contact avatar
- Full contact details (phone, email, office)
- Action buttons (Call, Email)
- External app integration (Phone, Mail apps)
- Professional card layout

---

### 4. Schedule Screen
**Purpose**: Weekly class timetable

**Features**:
- Grid-based schedule layout
- Time slots for each day
- Class information (subject, room, instructor)
- Color-coded class cards
- Responsive design for different screen sizes
- Scrollable for overflow content

**Schedule Details**:
- Monday to Friday timetable
- 7 time slots per day
- Break periods indicated
- Room numbers and instructor names

---

### 5. Notice Board Screen
**Purpose**: Campus announcements and notices

**Features**:
- List of notices with categories
- Priority indicators (high, medium, low)
- Category badges (Academic, Event, Important, General)
- Modal detail view with slide-up animation
- Full notice content in modal
- Date stamps for each notice

**Notice Categories**:
- Academic (exams, deadlines)
- Events (sports, cultural activities)
- Important (urgent information)
- General (maintenance, updates)

---

### 6. Campus Map Screen
**Purpose**: Campus navigation and locations

**Features**:
- List of map links and resources
- External link integration (Google Maps, etc.)
- Campus facility locations
- Building information
- Interactive cards with icons

**Map Resources**:
- Google Maps integration
- Virtual campus tour
- Hostel locations
- Library floor plans

---

### 7. Animation Demo Screen
**Purpose**: Showcase all animation types and gestures

**Features**:
- 6 different animation demonstrations
- Interactive buttons to trigger animations
- Draggable element with PanResponder
- Continuous pulse animation
- Progress bar with color interpolation
- Rotation, scale, slide, fade animations
- Visual feedback during interactions

**Animations Demonstrated**:
1. Fade toggle
2. Bounce effect
3. Slide animation
4. Rotation (360°)
5. Progress bar
6. Drag gesture

---

### 8. Profile Screen
**Purpose**: User information and settings

**Features**:
- Student profile information
- Theme toggle (Light/Dark mode)
- Notification settings
- Menu options for various features
- Logout button
- App version information
- Switch components for settings
- Professional profile card layout

**Settings Available**:
- Dark mode toggle
- Push notifications
- Email notifications

---

## 🎬 Animation Technical Details

### Animation API Used
All animations use **React Native Animated API** with `useNativeDriver: true` for optimal performance.

### Animation Techniques

1. **Animated.timing()**
   - Linear or eased animations
   - Used for fade, slide, rotation
   - Configurable duration and delay

2. **Animated.spring()**
   - Physics-based animations
   - Used for bounce effects
   - Configurable tension and friction

3. **Animated.loop()**
   - Continuous animations
   - Used for pulse effect
   - Runs indefinitely

4. **Animated.sequence()**
   - Chained animations
   - Run animations one after another
   - Used for complex animation flows

5. **Animated.parallel()**
   - Simultaneous animations
   - Multiple animations at once
   - Used for fade + scale effects

6. **Animated.stagger()**
   - Delayed sequence
   - Staggered start times
   - Used for card list animations

7. **Interpolation**
   - Value transformation
   - Color transitions
   - Used for progress bar colors

### Gesture Handling

**PanResponder API**:
- Touch tracking
- Drag gesture recognition
- Gesture lifecycle management
- Spring-back animation on release

---

## 🎯 Navigation Flow

```
App Start
    ↓
HomeScreen (Stack)
    ↓
MainTabs (Bottom Tab Navigator)
    ├── ContactScreen → ContactDetailScreen (Stack)
    ├── ScheduleScreen
    ├── NoticeScreen → Notice Modal
    ├── CampusMapScreen
    ├── AnimationDemoScreen
    └── ProfileScreen
```

**Navigation Types**:
- **Stack Navigation**: Home → Tabs → Details
- **Tab Navigation**: 6 bottom tabs
- **Modal Navigation**: Notice details
- **External Links**: Maps, email, phone

---

## 🏆 Highlights & Best Practices

### Code Quality
- ✅ TypeScript for type safety
- ✅ Comprehensive type definitions
- ✅ Meaningful variable and function names
- ✅ Detailed comments and documentation
- ✅ Consistent code formatting
- ✅ Component-based architecture
- ✅ Separation of concerns

### Performance
- ✅ `useNativeDriver` for animations
- ✅ Optimized re-renders with React hooks
- ✅ FlatList for efficient list rendering
- ✅ Memoization where appropriate

### User Experience
- ✅ Smooth animations (60 FPS)
- ✅ Visual feedback on interactions
- ✅ Loading and empty states
- ✅ Error handling
- ✅ Intuitive navigation
- ✅ Consistent design language

### Accessibility
- ✅ Readable font sizes
- ✅ High contrast colors
- ✅ Touch target sizes (minimum 44x44)
- ✅ Clear visual hierarchy

---

## 🔄 Real-World Usability

This app demonstrates **production-ready features**:

1. **Practical Use Case**: Genuine student productivity needs
2. **Scalable Architecture**: Easy to add new features
3. **Maintainable Code**: Clear structure and documentation
4. **Professional Design**: Modern, polished interface
5. **Cross-Platform**: Works on iOS and Android
6. **Performance**: Optimized animations and rendering
7. **User-Friendly**: Intuitive navigation and interactions

---

## 🎓 Learning Outcomes Demonstrated

1. **React Navigation**
   - Stack and Tab navigators
   - Parameter passing between screens
   - Navigation configuration and theming

2. **Animation Mastery**
   - Multiple animation types
   - Animation composition and sequencing
   - Performance optimization

3. **Gesture Handling**
   - PanResponder implementation
   - Touch event management
   - Gesture feedback

4. **Component Design**
   - Reusable component creation
   - Props and composition patterns
   - Type-safe components

5. **State Management**
   - React hooks (useState, useEffect, useRef)
   - Context API for theming
   - Local state management

6. **Responsive Design**
   - Dimensions API usage
   - Flexible layouts with Flexbox
   - Screen size adaptation

7. **TypeScript Integration**
   - Type definitions
   - Interface declarations
   - Type-safe navigation

---

## 📸 Screenshots

(Screenshots should be added showing):
1. Home Screen - Animated cards
2. Contact List - Search functionality
3. Contact Detail - Parameter passing
4. Schedule - Grid layout
5. Notice Board - Category badges
6. Campus Map - External links
7. Animation Demo - All 6 animations
8. Profile - Settings and theme toggle
9. Dark Mode - All screens in dark theme

---

## 🚧 Future Enhancements

Potential features for future versions:
- Backend integration with real API
- User authentication
- Push notifications
- Offline data caching
- Calendar integration
- Social features (student chat)
- File downloads (syllabus, notes)
- QR code scanner
- Attendance tracking
- Grade management

---

## 📝 Assignment Compliance Summary

| Requirement | Status | Implementation |
|------------|--------|----------------|
| 5 Required Screens | ✅ Complete | Home, Category/Menu, Detail, Profile, Animation Demo |
| Stack Navigation | ✅ Complete | AppNavigator with Stack |
| Tab/Drawer Navigation | ✅ Complete | Bottom Tabs with 6 screens |
| Responsive Layout | ✅ Complete | Dimensions API, Flexbox |
| 2+ Animations | ✅ Exceeded | 6 animation types |
| 1+ Gesture | ✅ Exceeded | 2 gesture types |
| Screen Transition | ✅ Complete | Multiple transitions |
| 1+ Reusable Component | ✅ Exceeded | 10 reusable components |
| No Backend | ✅ Complete | All data is local/mock |
| Clean UI/UX | ✅ Complete | Professional design |
| Code Organization | ✅ Complete | Well-structured project |
| Documentation | ✅ Complete | Comprehensive README |

---

## 👨‍💻 Developer Information

**Student ID**: 02240352  
**Module**: SWE201 - BE Software Engineering  
**Assignment**: Assignment 2 - Animation and Multiscreen App  
**Institution**: College of Science and Technology  
**Submission Date**: May 3, 2026

---

## 📄 License

This project is created for educational purposes as part of SWE201 coursework.

---

## 🙏 Acknowledgments

- **React Native Team** - Framework and documentation
- **Expo Team** - Development tools and libraries
- **React Navigation** - Navigation solution
- **@expo/vector-icons** - Icon library
- **Course Instructors** - Guidance and requirements

---

## 📞 Support & Contact

For questions or issues related to this project:
- **Email**: student@rub.edu.bt
- **GitHub**: (Repository link to be added)

---

**Made with ❤️ for students by students**

*Campus Companion v1.0.0 - Your all-in-one student productivity app*
