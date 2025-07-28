import {useState, useEffect, type ReactNode} from "react";
import {createUserWithEmailAndPassword, onAuthStateChanged, signOut, type User, type UserCredential} from "firebase/auth";
import {auth} from "@/lib/firebase"
import {AuthContext} from "@/context/AuthContext"

const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  /* check user login/logout activity using event listener */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser)=>{
      setUser(firebaseUser);
      setLoading(false);
    })
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log("Firebase User: ", user)
  }, [user]);

  /* return firebase sign up with email and password function*/
  function signUpWithEmailAndPassword(email:string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  /* call firebase sign out function*/
  async function logOut(): Promise<void> {
    await signOut(auth);
  }

  return (
    <AuthContext.Provider value={{user, loading, signUpWithEmailAndPassword ,logOut}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
