# Autism Quiz App - Project Structure & Flow Guide

## 📁 Project Structure Overview

This is a **React Native** mobile app (works on both Android and iOS). Here's how it's organized:

```
Autism-Quiz/
├── App.tsx                 # 🚀 Entry point - Sets up navigation
├── Screens/                # 📱 Different pages/screens of your app
│   ├── HomeScreen.tsx      # First screen users see
│   ├── LoginScreen.tsx     # Login page
│   └── SignUpScreen.tsx    # Registration page
├── Components/             # 🧩 Reusable UI pieces
│   ├── Button.tsx          # Custom button component
│   ├── Header.tsx          # Top navigation bar
│   ├── InputBox.tsx        # Text input field
│   └── Spacer.tsx          # Empty space component
├── Constants/              # 📐 Design system values
│   └── Constants.ts        # Colors, fonts, spacing, etc.
├── Hooks/                  # 🎣 Custom React hooks
│   └── useTypedNavigation.ts  # Navigation with TypeScript types
├── types.ts                # 📝 TypeScript type definitions
└── android/ & ios/         # Native platform code (auto-generated)
```

---

## 🔄 App Flow (How Users Navigate)

### 1. **App Starts** → `App.tsx`
- This is the **root** of your application
- Sets up the navigation system using React Navigation
- Defines which screens exist and how to move between them

```typescript
// App.tsx creates a "stack" of screens
Home → Login → SignUp
```

### 2. **Initial Screen** → `HomeScreen.tsx`
- Users land here first (because `initialRouteName="Home"`)
- Shows welcome message and three buttons:
  - **Login** → Navigates to LoginScreen
  - **Sign Up** → Navigates to SignUpScreen
  - **Continue as Guest** → (Not implemented yet)

### 3. **Navigation Flow**
```
HomeScreen
  ├─→ LoginScreen (when "Login" button pressed)
  │     └─→ Can go back to Home
  │
  └─→ SignUpScreen (when "Sign Up" button pressed)
        └─→ Can go back to Home (via back arrow)
```

---

## 🧩 Understanding Components

### **What are Components?**
Components are **reusable pieces of UI**. Think of them like LEGO blocks - you build them once and use them everywhere.

### **Your Components:**

#### 1. **Button.tsx** - Custom Button
```typescript
<Button 
  ButtonText="Login"           // Text on button
  ButtonBg={COLORS.primary}    // Background color
  TextColor="white"            // Text color
  OnPress={() => {...}}        // What happens when clicked
/>
```
- Used in: HomeScreen, LoginScreen, SignUpScreen
- Makes all buttons look consistent

#### 2. **Header.tsx** - Top Navigation Bar
```typescript
<Header 
  title="Autism Quiz"          // Title in center
  leftIcon={<ArrowLeft />}     // Optional left icon
  onPressLeft={() => {...}}    // Action when left icon clicked
/>
```
- Used in: All screens
- Provides consistent header across app

#### 3. **InputBox.tsx** - Text Input Field
```typescript
<InputBox 
  placeholder="Email"          // Hint text
/>
```
- Used in: LoginScreen, SignUpScreen
- Styled text input for forms

#### 4. **Spacer.tsx** - Empty Space
```typescript
<Spacer />  // Adds 20px of vertical space
```
- Used everywhere for spacing
- Keeps layout consistent

---

## 📐 Constants - Design System

**Location:** `Constants/Constants.ts`

This file stores all your **design values** in one place. This is a best practice!

### Why use Constants?
- **Consistency**: All buttons use same colors
- **Easy changes**: Change color once, updates everywhere
- **No magic numbers**: `SPACING.lg` is clearer than `16`

### What's inside:
```typescript
COLORS      // All color values (primary, secondary, etc.)
FONTSIZES   // Text sizes (h1, h2, body, etc.)
FONTWEIGHTS // Text weights (bold, regular, etc.)
SPACING     // Spacing values (xs, sm, md, lg, etc.)
RADIUS      // Border radius values
TYPOGRAPHY  // Pre-made text styles
```

**Example usage:**
```typescript
// Instead of: fontSize: 32
// You use: fontSize: FONTSIZES.h1

// Instead of: backgroundColor: "#12A3ED"
// You use: backgroundColor: COLORS.primary
```

---

## 🎣 Custom Hooks

### **useTypedNavigation.ts**
- A wrapper around React Navigation's `useNavigation`
- Adds **TypeScript type safety**
- Ensures you can only navigate to screens that exist

**Why it's useful:**
```typescript
// Without it: navigation.navigate('WrongScreen') // ❌ No error, but crashes
// With it: navigation.navigate('WrongScreen')    // ✅ TypeScript error!
```

---

## 📝 TypeScript Types

**Location:** `types.ts`

Defines what screens exist and what data they expect:

```typescript
export type RootStackParamList = {
    Login: undefined;    // Login screen needs no data
    SignUp: undefined;   // SignUp screen needs no data
    Home: undefined;     // Home screen needs no data
};
```

**Future example** (if you add a profile screen):
```typescript
Profile: { userId: string };  // Profile screen needs a userId
```

---

## 🔍 How It All Works Together

### Example: User clicks "Login" button

1. **HomeScreen.tsx** renders a Button:
   ```typescript
   <Button 
     OnPress={() => navigation.navigate('Login')}
   />
   ```

2. **navigation** comes from `useTypedNavigation()` hook

3. **useTypedNavigation** uses types from `types.ts` to ensure 'Login' is valid

4. **React Navigation** (in App.tsx) handles the screen transition

5. **LoginScreen.tsx** is displayed

---

## 🎨 Styling Approach

This project uses **StyleSheet.create()** for styles:

```typescript
const styles = StyleSheet.create({
  container: {
    flex: 1,                    // Takes full available space
    paddingHorizontal: 12,      // 12px padding on left/right
    backgroundColor: 'white',
  },
});
```

**Key concepts:**
- `flex: 1` = "Take all available space"
- `paddingHorizontal` = Left + Right padding
- `alignItems: 'center'` = Center items horizontally
- `justifyContent: 'center'` = Center items vertically

---

## 🚀 Running the App

### Development Commands:
```bash
npm start          # Start Metro bundler (JavaScript server)
npm run android    # Run on Android
npm run ios        # Run on iOS
```

### What happens:
1. Metro bundler compiles your TypeScript/React code
2. Code is sent to your device/emulator
3. App runs and you can see changes in real-time (Hot Reload)

---

## 📚 Key React Native Concepts

### 1. **JSX** - JavaScript + XML
```typescript
<View>
  <Text>Hello</Text>
</View>
```
- Similar to HTML, but React Native components

### 2. **Components** - Functions that return UI
```typescript
const MyComponent = () => {
  return <Text>Hello</Text>;
};
```

### 3. **Props** - Data passed to components
```typescript
<Button ButtonText="Click me" />  // ButtonText is a prop
```

### 4. **State** - Data that can change
```typescript
const [email, setEmail] = useState('');
// email is the value, setEmail updates it
```

### 5. **Hooks** - Special functions (start with "use")
- `useState` - Manage changing data
- `useNavigation` - Navigate between screens
- Custom hooks - Your own reusable logic

---

## 🎯 Next Steps to Learn

1. **Add State Management**
   - Make InputBox store text
   - Add form validation

2. **Add More Screens**
   - Quiz screen
   - Results screen

3. **Add Navigation Data**
   - Pass data between screens
   - Update types.ts

4. **Add API Calls**
   - Connect to backend
   - Store user data

5. **Add Authentication**
   - Implement login logic
   - Store user sessions

---

## 💡 Best Practices in This Project

✅ **Good things you're doing:**
- Using TypeScript for type safety
- Separating components for reusability
- Using constants for design values
- Organizing files by feature (Screens, Components)
- Using custom hooks for navigation

🔧 **Things you could improve:**
- Add form state management (useState for inputs)
- Add error handling
- Add loading states
- Add form validation
- Implement "Continue as Guest" functionality

---

## 🆘 Common Questions

**Q: Where do I add a new screen?**
A: Create it in `Screens/`, add it to `App.tsx` navigation, and update `types.ts`

**Q: How do I change colors?**
A: Edit `Constants/Constants.ts` - changes apply everywhere

**Q: How do I add a new component?**
A: Create it in `Components/` and import it where needed

**Q: What's the difference between a Screen and Component?**
A: Screens are full pages. Components are reusable pieces used inside screens.

---

## 📖 Resources

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [React Navigation Docs](https://reactnavigation.org/docs/getting-started)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Happy coding! 🎉**


