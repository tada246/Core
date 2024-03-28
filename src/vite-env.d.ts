/// <reference types="vite/client" />

// firebase appcheck debug token
export declare global {
    interface Window {
        FIREBASE_APPCHECK_DEBUG_TOKEN?: boolean;
    }
}
