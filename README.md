# Habit Tracker (Neobrutalism)

This is a Habit Tracker built with React Native (Expo), Convex, and Clerk.
It features a Neobrutalist design system, unified tracker, cohorts, programs, and social accountability features.

## Prerequisites

- **Node.js** (v18+)
- **npm** or **yarn**
- **Expo CLI** (optional, recommended: `npm install -g expo-cli`)
- A **Clerk** account for authentication
- A **Convex** account for the backend

## Getting Started

### 1. Install Dependencies

Clone the repo and install the required packages:

```bash
git clone https://github.com/your-username/habit-tracker.git
cd habit-tracker
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory. You will need keys from Clerk and Convex.

```bash
touch .env.local
```

Add the following keys:

```env
# Clerk
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...

# Convex
EXPO_PUBLIC_CONVEX_URL=https://...
```

**Where to find keys:**
*   **Clerk**: Go to [Clerk Dashboard](https://dashboard.clerk.com/) -> Select your application -> API Keys -> Publishable Key.
*   **Convex**: The URL will be generated in the next step when you initialize Convex.

### 3. Setup Convex Backend

Initialize the Convex project. This will prompt you to log in and create a new project.

```bash
npx convex dev
```

This command will:
1.  Connect your local environment to a Convex project.
2.  Generate the backend API files in `convex/_generated`.
3.  Display your deployment URL (e.g., `https://happy-otter-123.convex.cloud`). **Copy this URL into your `.env.local` file as `EXPO_PUBLIC_CONVEX_URL`.**

Keep this terminal running to sync your backend functions as you develop.

### 4. Run the Mobile App

Open a new terminal window and start the Expo development server:

```bash
npx expo start
```

- Scan the QR code with your phone (using Expo Go).
- Press `i` to run in the iOS Simulator (macOS only).
- Press `a` to run in the Android Emulator.
- Press `w` to run in the web browser.

## Features

### Core Functionality
- **Unified Tracker**: Track personal and cohort habits in one view.
- **Programs**: Browse and create reusable habit programs.
- **Cohorts**: Join cohorts, compete on leaderboards, and interact on the activity wall.
- **Social Accountability**: XP system, Penalty voting system.

### Tech Stack
- **Frontend**: React Native (Expo), Expo Router, TypeScript
- **Backend**: Convex (real-time database & functions)
- **Auth**: Clerk (email/password, social login)
- **Styling**: Custom Neobrutalist components (StyleSheet)

### Neobrutalist Design
The app uses a custom design system located in `src/theme` and `src/components/ui`. Key characteristics:
- **Bold Borders**: 2-3px black borders on components.
- **Hard Shadows**: Solid offset shadows (no blur).
- **Vibrant Colors**: High contrast primary and accent colors.
- **Typography**: Simple, bold headings.

## Project Structure

```
├── app/                  # Expo Router pages (screens)
│   ├── (auth)/           # Authentication screens (Login, Signup)
│   ├── (tabs)/           # Main tab navigation
│   └── _layout.tsx       # Root layout & providers
├── src/
│   ├── components/ui/    # Reusable UI components (Button, Card, Input)
│   ├── hooks/            # Custom hooks (useCurrentUser)
│   ├── providers/        # Context providers (Convex + Clerk)
│   └── theme/            # Design tokens (colors, spacing)
├── convex/               # Backend schema and functions
│   ├── schema.ts         # Database schema
│   ├── users.ts          # User management
│   ├── habits.ts         # Habit tracking logic
│   ├── programs.ts       # Program definitions
│   ├── cohorts.ts        # Cohort management
│   └── activity.ts       # Social feed & voting
└── package.json          # Dependencies
```

## Contributing

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'Add some amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.
