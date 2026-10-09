import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, 
    signOut, onAuthStateChanged, updateProfile, GoogleAuthProvider, signInWithPopup 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { 
    getDatabase, ref, set, get, update, remove, push, onValue 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

export const firebaseConfig = {
    apiKey: "AIzaSyCCjpzGDUgerMWwN9QpNuwrvQRH2W57qiE",
    authDomain: "food-c41d4.firebaseapp.com",
    databaseURL: "https://food-c41d4-default-rtdb.firebaseio.com",
    projectId: "food-c41d4",
    storageBucket: "food-c41d4.firebasestorage.app",
    messagingSenderId: "731774736265",
    appId: "1:731774736265:web:1d5618f677b68dfea6f358",
    measurementId: "G-4CSYKRCWNN"
};

export const ADMIN_EMAIL = "kazimmustafa38@gmail.com";

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

export {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
    ref,
    set,
    get,
    update,
    remove,
    push,
    onValue
};
