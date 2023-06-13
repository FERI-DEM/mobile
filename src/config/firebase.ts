import {getApp, getApps, initializeApp} from "firebase/app";
import {getAuth, sendPasswordResetEmail, updatePassword} from 'firebase/auth';
import {getReactNativePersistence, initializeAuth} from 'firebase/auth/react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import 'firebase/firestore';
import {getFirestore} from "firebase/firestore";

import {
    FIREBASE_API_KEY,
    FIREBASE_APP_ID,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET
} from "@env";

const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    databaseURL: FIREBASE_DATABASE_URL,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    appId: FIREBASE_APP_ID,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
};

const getAuthenticationModule = () => {
    if(getApps().length === 0) {
        const app = initializeApp(firebaseConfig);
        const auth = initializeAuth(app, {
            persistence: getReactNativePersistence(AsyncStorage)
        });
        return {auth, app}
    }
    else {
        const app = getApp();
        const auth = getAuth(app)
        return {auth, app}
    }
}
export const auth = getAuthenticationModule().auth
export const firebaseDatabase = getFirestore(getAuthenticationModule().app);

export const passwordReset = async (email: string) => {
    return await sendPasswordResetEmail(auth, email);
}

export const updatePasswordIfUserExists = async (newPassword: string) => {
    const firebaseUser = auth.currentUser;
    if(!firebaseUser) return false;
    return await updatePassword(firebaseUser, newPassword);
}