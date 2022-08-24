import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCCHvqYMKDiiQkMG1-LiLILYhNdbk1S0jc",
    authDomain: "ama-tasks-fbcrud.firebaseapp.com",
    projectId: "ama-tasks-fbcrud",
    storageBucket: "ama-tasks-fbcrud.appspot.com",
    messagingSenderId: "914305149436",
    appId: "1:914305149436:web:22cb7c465c65fc4558ea79"
};

import { getAuth } from "firebase/auth";



const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);