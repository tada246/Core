import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { ReCaptchaV3Provider, initializeAppCheck } from 'firebase/app-check';
import {
    GoogleAuthProvider,
    connectAuthEmulator,
    getAuth,
} from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectStorageEmulator, getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const google_provider = new GoogleAuthProvider();
const auth = getAuth(app);
const storage = getStorage(app);

const useEmulators =
    import.meta.env.VITE_USE_EMULATORS.toLowerCase() === 'true';
const isDev = import.meta.env.DEV;

if (useEmulators) {
    connectAuthEmulator(auth, 'http://localhost:9099', {
        disableWarnings: true,
    });
    connectFirestoreEmulator(db, 'localhost', 8080);
    connectStorageEmulator(storage, 'localhost', 9199);
}

if (isDev && !useEmulators) {
    window.self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}

if (!useEmulators) {
    initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(
            import.meta.env.VITE_RECAPTCHA_SITE_KEY
        ),
        isTokenAutoRefreshEnabled: true,
    });

    getAnalytics(app);
}

export { google_provider, auth, db, storage };
