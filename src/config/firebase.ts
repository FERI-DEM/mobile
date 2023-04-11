import {getApp, getApps, initializeApp} from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getReactNativePersistence, initializeAuth} from 'firebase/auth/react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {FIREBASE_API_KEY, FIREBASE_APP_ID, FIREBASE_AUTH_DOMAIN, FIREBASE_MESSAGING_SENDER_ID, FIREBASE_PROJECT_ID, FIREBASE_DATABASE_URL, FIREBASE_STORAGE_BUCKET} from "@env";
import {apiInstance} from "../api/axios";

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
        return initializeAuth(app, {
            persistence: getReactNativePersistence(AsyncStorage)
        });
    }
    else {
        const app = getApp();
        return getAuth(app)
    }
}
export const auth = getAuthenticationModule()

auth.onAuthStateChanged(async (user) => {
    if(user != null) {
        const token = await user.getIdToken(true)
        apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
})