# Practical 4: Implement push notifications for both Android and iOS platforms

**Student Number:** 02240352 
**Project:** PushDemo - Expo Push Notification System  

---

## AIM

To implement and test a complete push notification system in a cross-platform mobile application using Expo framework and demonstrate notification handling in both foreground and background states.

---

## OBJECTIVE

1. Set up Expo development environment with push notification capabilities
2. Configure Expo Application Services (EAS) for push notification infrastructure
3. Implement push token registration and permission handling
4. Create notification event listeners for foreground and background scenarios
5. Test local and remote push notifications on physical devices
6. Handle notification interactions and user responses

---

## LEARNING OUTCOMES

After completing this practical, students will be able to:

1. **Configure:** Expo SDK projects with notification plugins and dependencies
2. **Implement:** runtime permission handling for iOS and Android platforms
3. **Generate:** and manage Expo Push Tokens for device identification
4. **Create:** notification channels for Android devices
5. **Develop:** event listeners for notification reception and user interaction
6. **Debug:** common issues related to SDK compatibility and dependency management
7. **Test:** push notifications using Expo's notification tool
8. **Understand:** the difference between local and remote push notifications
9. **Apply:** best practices for notification handling in React Native applications

---

## INTRODUCTION

Push notifications are a critical feature in modern mobile applications, enabling real-time communication between servers and user devices. They allow applications to deliver timely information, updates, and alerts even when the app is not actively running.

This practical demonstrates the implementation of a complete push notification system using Expo SDK 54, which provides a unified API for handling notifications across iOS and Android platforms. The implementation covers the entire notification lifecycle from token generation to notification delivery and user interaction handling.

The Expo framework simplifies push notification implementation by abstracting platform-specific complexities and providing a consistent API. It includes built-in support for the Expo Push Notification Service, which handles the delivery of notifications to both iOS (via APNs) and Android (via FCM) devices.

Key concepts covered in this practical include:
- **Expo Push Tokens:** Unique identifiers for each device-app combination
- **Notification Permissions:** Runtime permission requests following platform guidelines
- **Notification Channels:** Android-specific categorization system
- **Event Listeners:** Handlers for notification arrival and user interaction
- **Foreground vs Background:** Different notification behaviors based on app state

---

## REQUIREMENTS

### Hardware Requirements

| Component | Specification |
|-----------|---------------|
| Development Computer | Windows/Mac/Linux with minimum 8GB RAM |
| Physical Mobile Device | iOS (iPhone) or Android device with internet connection |
| Internet Connection | For package downloads and Expo Go testing |

**Note:** This practical uses Expo Go app for testing, eliminating the need for USB cable connections.

### Software Requirements

| Software | Version | Purpose |
|----------|---------|---------|
| Node.js | v16.0 or higher | JavaScript runtime environment |
| npm/yarn | Latest | Package manager |
| EAS CLI | Latest | Expo Application Services CLI |
| Code Editor | VS Code (recommended) | Development environment |
| Expo Go App | Latest | Mobile app for testing (download from App Store/Play Store) |

---

## PROCEDURE

### Step 1: Install EAS CLI

Open terminal and install EAS CLI globally:

```powershell
npm install -g eas-cli
```

### Step 2: Create Expo Project

```powershell
npx create-expo-app@latest PushDemo
cd PushDemo
```

### Step 3: Install Dependencies

```powershell
npx expo install expo-notifications expo-device expo-constants
npm install --legacy-peer-deps
```

### Step 4: Configure EAS

```powershell
eas login
eas init
```

### Step 5: Update app.json

Add configuration for notifications:

```json
{
  "expo": {
    "ios": {
      "bundleIdentifier": "com.yourname.pushdemo"
    },
    "android": {
      "package": "com.yourname.pushdemo"
    },
    "plugins": [
      ["expo-notifications", {
        "icon": "./assets/images/icon.png",
        "color": "#ffffff",
        "defaultChannel": "default"
      }]
    ],
    "extra": {
      "eas": {
        "projectId": "c99becd8-0670-4129-b723-e1eb3090e649"
      }
    }
  }
}
```

### Step 6: Implement Notification Handler

In `app/(tabs)/index.tsx`, add global notification handler:

```typescript
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }) as any,
});
```

### Step 7: Create Registration Function

```typescript
async function registerForPushNotificationsAsync(): Promise<string | null> {
  if (!Device.isDevice) {
    Alert.alert("Error", "Physical device required");
    return null;
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  
  if (finalStatus !== "granted") {
    Alert.alert("Permission Denied");
    return null;
  }

  const projectId = Constants.expoConfig?.extra?.eas?.projectId;
  const token = await Notifications.getExpoPushTokenAsync({ projectId });
  return token.data;
}
```

### Step 8: Add Event Listeners

```typescript
export default function App() {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [lastReceived, setLastReceived] = useState<string>("—");

  useEffect(() => {
    registerForPushNotificationsAsync().then(setExpoPushToken);

    const receivedSub = Notifications.addNotificationReceivedListener(
      (notification) => {
        setLastReceived(notification.request.content.body ?? "");
      }
    );

    const responseSub = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const data = response.notification.request.content.data;
        Alert.alert("Tapped", JSON.stringify(data));
      }
    );

    return () => {
      receivedSub.remove();
      responseSub.remove();
    };
  }, []);

  async function fireLocalNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hello",
        body: "Local notification",
        data: { screen: "Home" },
      },
      trigger: { seconds: 2 } as any,
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expo Push Demo</Text>
      <Text selectable>{expoPushToken ?? "Loading..."}</Text>
      <Text>{lastReceived}</Text>
      <Button title="Fire Local (2s)" onPress={fireLocalNotification} />
    </View>
  );
}
```

### Step 9: Start Development Server

```powershell
npx expo start
```

### Step 10: Test on Physical Device

1. Install Expo Go app on your iPhone/Android from App Store/Play Store
2. Scan the QR code displayed in terminal using:
   - **iOS:** Camera app
   - **Android:** Expo Go app
3. App opens in Expo Go
4. Grant notification permission when prompted

![QR Scan](<Screenshot 2026-05-18 050314.png>)


### Step 11: Copy Push Token

1. View the push token displayed on your device screen
2. Token format: `ExponentPushToken[XXXXXXXX...]`
3. Long-press to select and copy the entire token

![Push-Notification](<WhatsApp Image 2026-05-18 at 4.32.06 AM.jpeg>)

### Step 12: Test Local Notification

1. Tap "Fire Local (2s)" button
2. Wait 2 seconds
3. Notification appears on device

### Step 13: Test Remote Notification

1. Open browser: https://expo.dev/notifications
2. Paste your push token
3. Enter title, body, and data: `{"screen":"Home"}`
4. Click "Send a Notification"
5. Lock phone or minimize app
6. Notification arrives within 2-5 seconds

### Step 14: Test Notification Tap

1. Tap the received notification
2. App opens and shows alert with data payload

---

## OBSERVATION

### 1. Token Generation
- Push token generated successfully on app launch in Expo Go
- Token format: `ExponentPushToken[XXXXXXXXXXXXXXXXXXXXXXXX]`
- Token remains consistent across app restarts
- Works on both iOS and Android devices via Expo Go

### 2. Permission Handling
- Permission dialog appears on first app launch
- iOS shows native system permission dialog
- Android requires explicit channel creation first
- Permission state persists after granting

### 3. Local Notifications
- Local notifications trigger after 2-second delay
- Work without internet connection
- Display in system notification tray when app backgrounded
- Captured by listener when app is in foreground

### 4. Remote Notifications
- Remote notifications delivered within 2-5 seconds
- Successful delivery in foreground and background states
- **Foreground:** Listener updates UI immediately
- **Background:** Appears in system tray
- Tapping notification opens app and triggers response listener

### 5. Expo Go Testing
- No USB cable or build process required
- Instant updates via QR code scanning
- Works seamlessly on both iOS and Android
- Quick iteration for development and testing
- Suitable for testing notification functionality

---

## PROBLEMS ENCOUNTERED

### Problem 1: Corrupted package.json

**Description:** package.json had incorrect content preventing app startup.

**Solution:** Recreated package.json with proper dependencies and ran `npm install --legacy-peer-deps`

### Problem 2: SDK Version Mismatch

**Description:** Project SDK 52 incompatible with Expo Go SDK 54.

**Solution:** Upgraded to SDK 54 using `npx expo install expo@~54.0.0` and `npm install --legacy-peer-deps`

### Problem 3: Peer Dependency Conflicts

**Description:** React 19 caused npm installation errors.

**Solution:** Used `--legacy-peer-deps` flag for all npm operations

### Problem 4: Missing Dependencies

**Description:** Build failures due to missing expo-image, expo-haptics, and react-native-worklets.

**Solution:**
- Replaced expo-image with React Native's Image component
- Removed expo-haptics functionality
- Replaced react-native-reanimated with React Native Animated API

### Problem 5: TypeScript Type Errors

**Description:** Type mismatches in notification handler and event subscriptions.

**Solution:**
- Changed to `Notifications.EventSubscription` type
- Added `as any` assertions where needed
- Simplified trigger syntax

---

## CONCLUSION

This practical successfully implemented a complete push notification system using Expo SDK 54, achieving all objectives including token generation, permission handling, and notification delivery testing. The project utilized Expo Go for wireless testing on iOS devices, eliminating the need for USB cables or complex build processes. We successfully generated Expo Push Tokens, implemented proper permission handling, created event listeners for foreground and background scenarios, and tested both local and remote notifications. Five major issues were encountered and resolved during development, including SDK version mismatches, peer dependency conflicts, and missing dependencies, providing valuable debugging experience. Key insights gained include the importance of SDK version consistency, proper event lifecycle management, and the efficiency of Expo's unified API for cross-platform development. The application is fully functional, handles push notifications in all scenarios, and serves as a foundation for practical applications like e-commerce updates, social media notifications, and real-time messaging systems, ready for further development and production deployment.

---

## REFERENCE

sarojsanyasi. (n.d.). *Expo push notifications* [Course material provided by tutor]. HackMD. https://hackmd.io/@sarojsanyasi/expo-notification

---

