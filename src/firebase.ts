import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent, Analytics } from 'firebase/analytics';

// Firebase configuration using Vite environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

let analytics: Analytics | null = null;

// Only initialize Firebase Analytics if appId and measurementId are available.
// This prevents errors in local development where these keys might not be configured.
if (import.meta.env.VITE_FIREBASE_APP_ID && import.meta.env.VITE_FIREBASE_MEASUREMENT_ID) {
  try {
    const app = initializeApp(firebaseConfig);
    analytics = getAnalytics(app);
    console.log("Firebase Analytics initialized successfully.");
  } catch (error) {
    console.error("Failed to initialize Firebase Analytics:", error);
  }
} else {
  console.warn(
    "Firebase environment variables (VITE_FIREBASE_APP_ID/VITE_FIREBASE_MEASUREMENT_ID) are missing. Firebase Analytics is disabled."
  );
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
