import {createContext} from "react";
import {type User, type UserCredential} from "firebase/auth";

type AuthContextType = {
  user: User | null,
  loading: boolean,
  signUpWithEmailAndPassword: (email: string, password: string) => Promise<UserCredential>,
  logOut: () => Promise<void>
}

export const AuthContext  = createContext<AuthContextType | undefined>(undefined);