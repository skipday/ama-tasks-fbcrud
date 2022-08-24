import { db } from '../firebase'
import { collection, doc, getDoc, setDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

export const createUser = async(currUser) => {
    const usersRef = collection(db, "users");
    const docRef = doc(db, "users", currUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Current User:", docSnap.data());
    } else {
        await setDoc(doc(usersRef, currUser.uid), {
            name: currUser.displayName || 'anonymous',
            email: currUser.email,
            createdAt: new Date()
        });
    }
}

export const addTodo = async (user, text) => {
    const docRef = await addDoc(collection(db, 'users', user?.uid, 'todos'), {
        text: text,
        checked: false,
        time: Date.now()
    })
}

export const updateTodo = async (user, todo, newText) => {
    const docRef = await updateDoc(doc(db, 'users', user.uid, 'todos', todo.id), {
        text: newText
    })
}

export const checkTodo = async (user, todo, checked) => {
    const docRef = await updateDoc(doc(db, 'users', user.uid, 'todos', todo.id), {
        checked: checked
    })
}

export const deleteTodo = async (user, todo) => {
    const docRef = await deleteDoc(doc(db, 'users', user.uid, 'todos', todo.id));
}