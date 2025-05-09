import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/homepage"
import Navbar from "./components/Navbar"
import { RegisterPage } from "./pages/RegisterPage"
import { AuthProvider } from "./context/auth/authprovider"
import { LoginPage } from "./pages/LoginPage"
import { CartPage } from "./pages/CartPage"
import ProtectedRoute from "./components/ProtectedRoute"
import { CartProvider } from "./context/cart/cartcontext"
import { CheckoutPage } from "./pages/checkoutPage"

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/login" element={<LoginPage/>} />
            
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/cart" element={<CartPage/>} />
              <Route path="/checkout" element={<CheckoutPage/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
