import {createUserWithEmailAndPassword, signOut, type UserCredential} from "firebase/auth";
import {auth} from "@/lib/firebase"

/* return firebase sign up with email and password function*/
export function signUpWithEmailAndPassword(email:string, password: string): Promise<UserCredential> {
  return createUserWithEmailAndPassword(auth, email, password);
}

/* call firebase sign out function*/
export function logOut(): Promise<void> {
  return signOut(auth);
}