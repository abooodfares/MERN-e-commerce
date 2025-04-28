
 import { GetCartItems } from "../api/Authapi"
import { useState, useEffect } from "react"
import { useauth } from "../context/auth/authcontext"
import { Container, Typography } from "@mui/material"


export const CartPage = () => {
    const Auth = useauth()
    const [cartItems, setCartItems] = useState<any[]>([])
  
    const [error, setError] = useState<any>(null)

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                if(!Auth?.token){
                    return
                }
                const response = await GetCartItems(Auth.token)
                const data = await response.json()
                setCartItems(data)
            } catch (error) {
                setError(error)
            }
        }
        fetchCartItems()
    },[])

    
    return (
        <Container>
            <Typography variant="h4">Cart</Typography>
            {cartItems.map((item) => (
                <div key={item._id}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body1">{item.price}</Typography>
                </div>
            ))}
        </Container>
       
    )
    
}
