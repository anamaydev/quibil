import {Navigate} from 'react-router-dom';
import {Outlet} from 'react-router-dom';
// import HomeLayout from "@/components/HomeLayout";
import {useAuthContext} from "@/context/Auth/useAuthContext.ts";

const AuthRequired = () => {
  const {user, loading} = useAuthContext();

  if(loading) return <h1>Nigga wait...</h1>;

  if(user === null) {
    console.log("Sending user to /login");
    return <Navigate to="/login" replace/>;
  }
  else {
    console.log("Sending user to /HomeLayout");
    // return <Navigate to="/home" replace/>;
    return <Outlet/>
  }
}
export default AuthRequired
