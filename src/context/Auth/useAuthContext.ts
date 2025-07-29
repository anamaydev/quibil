import {useContext} from "react";
import {AuthContext} from "@/context/AuthContext.ts";

/* custom useAuthContext function */
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("useAuthContext must be used within a AuthProvider");
  return context;
}