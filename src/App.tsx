import {BrowserRouter, Routes, Route} from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"
import Layout from "./components/Layout"
import Login from "./pages/Login"
import AddTenants from "./pages/AddTenants"

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login/>}/>
          <Route path="setup" element={<AddTenants/>}/>
          <Route path="/" element={<Layout/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
export default App
