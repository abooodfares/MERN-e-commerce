import { Container, Typography, Box, Button } from "@mui/material"
import { useCart } from "../context/cart/cartcontext"
import { useauth } from "../context/auth/authcontext"
import { CartItem } from "../components/CartItem"

export const CartPage = () => {
    const { products, totalPrice, deleteAll } = useCart();
    const Auth = useauth();

    if (!Auth?.token) {
        return <div>Please login to view your cart</div>;
    }

    if (products.length === 0) {
        return (
            <Container>
                <Typography variant="h4" sx={{ mt: 4, textAlign: 'center' }}>
                    Your cart is empty
                </Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" sx={{ mb: 4 }}>
                Shopping Cart
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {products.map((item) => (
                    <CartItem key={item._id} item={item} />
                ))}
            </Box>
            <Box sx={{ mt: 4, textAlign: 'right' }}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                    Total: {totalPrice} Riyal
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button 
                        variant="contained" 
                        color="error" 
                        size="large"
                        onClick={deleteAll}
                    >
                        Delete All
                    </Button>
                    <Button variant="contained" color="primary" size="large">
                        Proceed to Checkout
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
