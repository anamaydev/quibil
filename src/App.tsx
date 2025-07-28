import {BrowserRouter, Routes, Route} from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"
import Layout from "./components/Layout"
import Login from "./pages/Login"
import AuthRequired from "@/components/AuthRequired.tsx";
import AddTenants from "./pages/AddTenants"
import AuthProvider from "@/context/AuthProvider"

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login/>}/>
            {/*<Route path="/layout" element={<Layout/>}/>*/}
            <Route path="/" element={<AuthRequired/>}>
              <Route path="/setup" element={<AddTenants/>}/>
              <Route path="/layout" element={<Layout/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  )
}
export default App
