import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"
import HomeLayout from "./components/HomeLayout.tsx"
import Login from "./pages/Login"
import AuthRequired from "@/components/AuthRequired";
import AddTenants from "./pages/AddTenants"
import AuthProvider from "@/context/Auth/AuthProvider"
import TenantProvider from "@/context/Tenant/TenantProvider"
import Calculator from "@/pages/Calculator";
import Tenants from "@/pages/Tenants.tsx";

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/" element={<AuthRequired/>}>
              <Route element={<TenantProvider/>}>
                <Route index element={<Navigate to="home" replace />} />
                <Route path="home" element={<HomeLayout/>}>
                  <Route index element={<Calculator/>}/>
                  <Route path="tenants" element={<Tenants/>}/>
                </Route>
                <Route path="setup" element={<AddTenants/>}/>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  )
}
export default App
