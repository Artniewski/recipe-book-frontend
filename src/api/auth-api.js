import { auth } from '../core/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail, signOut } from 'firebase/auth';

export const logoutUser = () => {
    signOut(auth);
}

export const signUpUser = async ({ name, email, password }) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        
        return { user: userCredential.user };
    } catch (error) {
        return {
            error: error.message,
        }
    }
}

export const loginUser = async ({ email, password }) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { user: userCredential.user };
    } catch (error) {
        return {
            error: error.message,
        }
    }
}

export const sendEmailWithPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        return {};
    } catch (error) {
        return {
            error: error.message,
        }
    }
}
