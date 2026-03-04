# Bloom Track

Bloom Track is a personal growth and progress-tracking app built with React and Firebase. It helps users set goals, track daily habits, and reflect on their growth.

## Features
- Email/password authentication (Firebase Auth)
- Goals CRUD (Firestore)
- Daily habit tracking with streaks (Firestore)
- Daily reflections with mood (Firestore)
- Simple progress charts (Chart.js)
- Firestore security rules to restrict access

## Project structure
- `src/` — React source code
- `src/components` — UI components (Auth, Dashboard, Goals, Habits, Reflection, ProgressChart)
- `src/firebase.js` — Firebase init (replace placeholders)
- `firestore.rules` — Firestore security rules

## Firebase setup
1. Create a Firebase project at https://console.firebase.google.com/
2. Enable **Authentication > Email/Password**.
3. Create a Firestore database (in production use locked rules and appropriate indexes).
4. Copy your Firebase config and paste it into `src/firebase.js` replacing the placeholders.
5. Deploy `firestore.rules` to your project:

```bash
# install firebase-tools if you need
# npm i -g firebase-tools
# login
firebase login
# initialize in project folder (optional)
firebase deploy --only firestore:rules
```

## Local run
1. Install dependencies:

```bash
npm install
```

2. Start dev server:

```bash
npm run dev
```

3. Open http://localhost:5173

## Notes & extensions
- This starter app focuses on clarity and beginner-friendliness. You can extend it with:
  - Dark mode
  - Push/local notifications for streak reminders
  - Richer analytics and date-based charts
  - Mobile-friendly UX tweaks

If you want, I can: wire up Tailwind, add routing, or implement email verification and richer charts.
