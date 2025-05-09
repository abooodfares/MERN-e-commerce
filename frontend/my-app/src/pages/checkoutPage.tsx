import { Container, Typography, Box, Button, TextField, Paper } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useCart } from "../context/cart/cartcontext";
import { useauth } from "../context/auth/authcontext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const CheckoutPage = () => {
    const { products, totalPrice, completeOrder } = useCart();
    const Auth = useauth();
    const navigate = useNavigate();
    const [address, setAddress] = useState("");
    const [orderComplete, setOrderComplete] = useState(false);

    if (!Auth?.token) {
        return <div>Please login to checkout</div>;
    }

    if (products.length === 0 && !orderComplete) {
        return (
            <Container>
                <Typography variant="h4" sx={{ mt: 4, textAlign: 'center' }}>
                    Your cart is empty
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Button variant="contained" onClick={() => navigate('/')}>Continue Shopping</Button>
                </Box>
            </Container>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await completeOrder(address);
            setOrderComplete(true);
        } catch (error) {
            console.error('Error completing order:', error);
        }
    };

    if (orderComplete) {
        return (
            <Container maxWidth="md" sx={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <CheckCircleIcon sx={{ fontSize: 120, color: 'success.main', mb: 2 }} />
                <Typography variant="h3" sx={{ mb: 2, textAlign: 'center' }}>
                    Thanks for your order.
                </Typography>
                <Typography variant="h6" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                    We started processing it, and we will get back to you soon
                </Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" sx={{ mb: 4 }}>
                Checkout
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
                <Box sx={{ flex: { md: '2' } }}>
                    <Paper sx={{ p: 3, mb: 3 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Order Summary
                        </Typography>
                        {products.map((item) => (
                            <Box
                                key={item._id}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mb: 2,
                                    p: 2,
                                    border: '1px solid #e0e0e0',
                                    borderRadius: 1
                                }}
                            >
                                <Box
                                    component="img"
                                    src={`/${item.img}`}
                                    alt={item.name}
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        objectFit: 'cover',
                                        mr: 2,
                                        borderRadius: 1
                                    }}
                                />
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="subtitle1">{item.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Quantity: {item.quantity}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Price: {item.unitPrice} Riyal
                                    </Typography>
                                </Box>
                                <Typography variant="subtitle1" color="primary">
                                    {item.unitPrice * item.quantity} Riyal
                                </Typography>
                            </Box>
                        ))}
                    </Paper>
                </Box>
                <Box sx={{ flex: { md: '1' } }}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Delivery Information
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Delivery Address"
                                multiline
                                rows={4}
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                                sx={{ mb: 3 }}
                            />
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Total: {totalPrice} Riyal
                            </Typography>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                size="large"
                            >
                                Place Order
                            </Button>
                        </form>
                    </Paper>
                </Box>
            </Box>
        </Container>
    );
};
