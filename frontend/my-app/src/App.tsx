import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/homepage"
import Navbar from "./components/Navbar"
import { RegisterPage } from "./pages/RegisterPage"
import { AuthProvider } from "./context/auth/authprovider"



function App() {


  return (
    <AuthProvider>
    
 <BrowserRouter
  >
    <Navbar/>
    <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/register" element={<RegisterPage/> } />
    
      </Routes>
  </BrowserRouter>
  </AuthProvider>
  )
}

export default App
