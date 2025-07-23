import {Link, Outlet} from "react-router-dom"
const Layout = () => {
  return (
    <main>
      <Link to="/login">Login</Link>
      <Outlet/>
    </main>
  )
}
export default Layout
