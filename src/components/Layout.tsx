import {Link, Outlet} from "react-router-dom"
const Layout = () => {
  return (
    <main>
      <div className="pl-2 flex gap-2">
        <Link to="/login">Login</Link>
        <Link to="/setup">Add Tenants</Link>
      </div>
      <Outlet/>
    </main>
  )
}
export default Layout
