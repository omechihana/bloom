// Firebase initialization (modular SDK v9+)
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import analytics only when available (browser)

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAZrWeNAro4icYgs6rQxYxTMPpAYxZfCPM",
  authDomain: "bloom-5430d.firebaseapp.com",
  projectId: "bloom-5430d",
  storageBucket: "bloom-5430d.firebasestorage.app",
  messagingSenderId: "252676413238",
  appId: "1:252676413238:web:6b4157c4ed21da7a420597",
  measurementId: "G-HZ50W7N8ES"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize analytics only in browser environments and guard errors
let analytics = null
try {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    // lazy-load to avoid issues in non-browser environments
    // (importing 'firebase/analytics' at top can fail in some environments)
    // eslint-disable-next-line no-undef
    const { getAnalytics } = require('firebase/analytics')
    analytics = getAnalytics(app)
  }
} catch (e) {
  // not fatal for auth/firestore — log to help debugging
  // avoid exposing secrets in logs
  // eslint-disable-next-line no-console
  console.warn('Firebase analytics not initialized:', e && e.message ? e.message : e)
}

const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
