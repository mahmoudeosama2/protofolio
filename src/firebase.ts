import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent, Analytics } from 'firebase/analytics';

// Firebase configuration using Vite environment variables with generated fallbacks
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDu0E6KVHwiB-jwi7cTHMMG4ivzFRLmbLM",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "mahmoud-osama-portfolio.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "mahmoud-osama-portfolio",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "mahmoud-osama-portfolio.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "89964404406",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:89964404406:web:26f7f3f9c1656d06549017",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "",
};

let analytics: Analytics | null = null;

// Initialize Firebase Analytics if config is present.
// Note: Google Analytics must be enabled in the Firebase Console to start receiving events.
if (firebaseConfig.appId && firebaseConfig.apiKey) {
  try {
    const app = initializeApp(firebaseConfig);
    // getAnalytics will initialize and automatically fetch/use the measurementId if available.
    analytics = getAnalytics(app);
    console.log("Firebase Analytics initialized successfully.");
  } catch (error) {
    console.error("Failed to initialize Firebase Analytics:", error);
  }
} else {
  console.warn("Firebase configuration is missing. Firebase Analytics is disabled.");
}

export { analytics };

/**
 * Logs a custom event to Firebase Analytics if initialized.
 * @param eventName Name of the event (e.g. 'view_app_details')
 * @param eventParams Additional parameters to log
 */
export const logCustomEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (analytics) {
    try {
      logEvent(analytics, eventName, eventParams);
    } catch (error) {
      console.error(`Error logging event "${eventName}":`, error);
    }
  }
};
