import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth/cordova";
import { addDoc, collection, getFirestore } from "firebase/firestore/lite";
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyAb7O-hXgYuNKXCUxVIP_4aD0mRKyhbvVk",
    authDomain: "netflix-d5aae.firebaseapp.com",
    projectId: "netflix-d5aae",
    storageBucket: "netflix-d5aae.firebasestorage.app",
    messagingSenderId: "1011085484614",
    appId: "1:1011085484614:web:45869afbe3becf9cb6a047"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const logout = () => {
    signOut(auth);
}

export { auth, db, signUp, login, logout }