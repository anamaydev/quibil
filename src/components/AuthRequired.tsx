import {Navigate, Outlet} from 'react-router-dom';
// import Layout from "@/components/Layout";
import {useAuthContext} from "@/context/useAuthContext";

const AuthRequired = () => {
  const {user, loading} = useAuthContext();

  if(loading) return <h1>Nigga wait...</h1>;

  if(user === null) {
    console.log("Sending user to /login");
    return <Navigate to="/login" replace/>;
  }
  else {
    console.log("Sending user to /Layout");
    return <Outlet/>;
  }
}
export default AuthRequired
