import {createUserWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider , signInWithPopup, signOut, type UserCredential} from "firebase/auth";
import {auth} from "@/lib/firebase"

/* return firebase sign up with email and password function*/
export function signUpWithEmailAndPassword(email:string, password: string): Promise<UserCredential> {
  return createUserWithEmailAndPassword(auth, email, password);
}

/* call firebase sign out function*/
export function logOut(): Promise<void> {
  return signOut(auth);
}

export function signInWithGoogle(): Promise<UserCredential> {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

export function signInWithMeta(): Promise<UserCredential> {
  const provider = new FacebookAuthProvider();
  return signInWithPopup(auth, provider);
}