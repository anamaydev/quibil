import {Link} from "react-router-dom"
import {useAuthContext} from "@/context/useAuthContext";

const Layout = () => {
  const {logOut} = useAuthContext();
  return (
    <main>
      <div className="pl-2 flex gap-2">
        <Link to="/login">Login</Link>
        <Link to="/setup">Add Tenants</Link>
        <button className="bg-white rounded px-2 text-black cursor-pointer" onClick={logOut}>Log Out</button>
      </div>
    </main>
  )
}
export default Layout
