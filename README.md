# Habit Tracker (Neobrutalism)

This is a Habit Tracker built with React Native (Expo), Convex, and Clerk.
It features a Neobrutalist design system, unified tracker, cohorts, programs, and social accountability features.

## Prerequisites

- Node.js
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

## Setup

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Setup Environment Variables:**

    Create a `.env.local` file in the root directory and add your Clerk and Convex keys:

    ```env
    EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
    EXPO_PUBLIC_CONVEX_URL=https://...
    ```

3.  **Setup Convex:**

    Login to Convex and initialize the project:

    ```bash
    npx convex dev
    ```

    This will generate the backend API files in `convex/_generated`.

4.  **Run the App:**

    ```bash
    npx expo start
    ```

## Features

- **Unified Tracker**: Track personal and cohort habits in one view.
- **Programs**: Browse and create habit programs.
- **Cohorts**: Join cohorts, compete on leaderboards, and interact on the activity wall.
- **Social Accountability**: XP system, Penalty voting system.
- **Neobrutalist Design**: Custom UI components.

## Project Structure

- `app/`: Expo Router pages.
- `src/components/ui`: Neobrutalist UI components.
- `src/theme`: Design tokens.
- `convex/`: Backend schema and functions.
