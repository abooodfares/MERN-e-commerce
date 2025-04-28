import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/homepage"
import Navbar from "./components/Navbar"
import { RegisterPage } from "./pages/RegisterPage"
import { AuthProvider } from "./context/auth/authprovider"
import { LoginPage } from "./pages/LoginPage"
import { CartPage } from "./pages/CartPage"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<CartPage/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
