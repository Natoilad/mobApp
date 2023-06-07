import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, initializeAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDNbeO9ZoD8oEcTILEZm5XNDZedTN5wBcA',
  authDomain: 'reactnative-453be.firebaseapp.com',
  projectId: 'reactnative-453be',
  storageBucket: 'reactnative-453be.appspot.com',
  messagingSenderId: '743266318700',
  appId: '1:743266318700:web:53efe9b3f7d5f935881b49',
  measurementId: 'G-JX0YKDM0N5',
};

let app;
let auth;
if (getApps().length < 1) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
  app = getApp();
  auth = getAuth();
}
export { app, auth };
export const db = getFirestore(app);
export const storage = getStorage(app);
