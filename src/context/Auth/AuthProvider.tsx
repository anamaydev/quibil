import {useState, useEffect, type ReactNode} from "react";
import {onAuthStateChanged, type User} from "firebase/auth";
import {auth} from "@/lib/firebase.ts"
import {AuthContext} from "@/context/Auth/AuthContext.ts"
import {signUpWithEmailAndPassword, signInWithGoogle, signInWithMeta, logOut} from "@/services/auth.ts";

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

  return (
    <AuthContext.Provider value={{user, loading, signUpWithEmailAndPassword, signInWithGoogle, signInWithMeta ,logOut}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
