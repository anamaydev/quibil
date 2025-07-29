import {BrowserRouter, Routes, Route, Outlet} from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"
import Layout from "./components/Layout"
import Login from "./pages/Login"
import AuthRequired from "@/components/AuthRequired";
import AddTenants from "./pages/AddTenants"
import AuthProvider from "@/context/Auth/AuthProvider"
import TenantProvider from "@/context/Tenant/TenantProvider"

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/" element={<AuthRequired/>}>
              <Route element={
                <TenantProvider>
                  <Outlet/>
                </TenantProvider>
              }>
                <Route path="/setup" element={<AddTenants/>}/>
                <Route path="/layout" element={<Layout/>}/>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  )
}
export default App
