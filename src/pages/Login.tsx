import {useState, useEffect, type FormEvent} from "react";
import {useAuthContext} from "@/context/AuthContext.tsx";
import {useNavigate} from "react-router-dom";

// import {auth} from "@/lib/firebase.ts";
// import {createUserWithEmailAndPassword} from "firebase/auth"

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {IconGoogle, IconMeta, Logo} from "@/components/icons";

type AuthData = {
  email: string,
  password: string,
}

const Login = () => {
  const {signUpWithEmailAndPassword} = useAuthContext();
  const [authData, setAuthData] = useState<AuthData>({email: "", password: ""});
  const navigate = useNavigate();
  // const [userLoggedIn, setUserLoggedIn] = useState(localStorage.getItem("userLoggedIn") ? localStorage.getItem("userLoggedIn"):false);

  /* logging in the authData for debugging */
  useEffect(()=>{
    console.log("authData", authData);
  },[authData]);

  /* modify email property from authData on change*/
  function handleEmailChange(value:string) {
    setAuthData(prevAuthData => ({...prevAuthData, email: value}));
  }

  /* modify password property from authData on change*/
  function handlePasswordChange(value:string) {
    setAuthData(prevAuthData => ({...prevAuthData, password: value}));
  }

  // async function handleSignUpWithEmailAndPassword(e:FormEvent<HTMLFormElement>){
  //   e.preventDefault();
  //   try{
  //     const userCredential = await createUserWithEmailAndPassword(auth, authData.email, authData.password);
  //     const user = userCredential.user;
  //     console.log("user: ",user);
  //     console.log("user.email: ",user.email);
  //     console.log("userCredential: ",userCredential);
  //   }catch(err){
  //     console.error(err);
  //   }
  // }


  async function handleSignUpWithEmailAndPassword(e: FormEvent<HTMLFormElement>){
    e.preventDefault();
    try{
      await signUpWithEmailAndPassword(authData.email, authData.password);
      navigate("/setup");
    }catch(error){
      console.log(error);
    }
  }

  return (
    <main className="relative min-h-dvh flex justify-center items-center px-6">
      <Logo className="absolute top-20" />
      <Card className="w-full max-w-sm flex flex-col">
        <CardHeader className="w-full">
          <CardTitle className="font-semibold text-2xl">Create an account</CardTitle>
          <CardDescription className="text-sm">Enter your email below to create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form action="/" onSubmit={(e)=>handleSignUpWithEmailAndPassword(e)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="mika@mouse.com"
                  onChange={(e)=>handleEmailChange(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Label>Password</Label>
                <Input
                  type="password"
                  name="password"
                  onChange={(e)=>handlePasswordChange(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">Create account</Button>
            </div>
          </form>

          <div className="relative w-full mt-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card text-muted-foreground px-2">Or continue with</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="grid grid-cols-2 gap-4">
          <Button variant="outline" type="button" className="w-full">
            <IconGoogle/>
          </Button>
          <Button variant="outline" type="button" className="w-full">
            <IconMeta/>
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}
export default Login
