import { useEffect, useState } from "react"
import { GetAllCompletedOrders } from "../api/Authapi"
import { useauth } from "../context/auth/authcontext"
import { Container, Typography, Box, Paper, Divider } from "@mui/material";

interface IOrderitem {
  itemname: string;
  quantity: number;
  price: number;
}

interface IOrder {
  totalprice: number;
  address: string;
  items: IOrderitem[];
}

export const OrderPage = () => {
    const Auth = useauth();
    const [orders, setOrders] = useState<IOrder[]>([]);
    useEffect(() => {
        const fetchorders = async () => {
            const response = await GetAllCompletedOrders(Auth!.token);
            const data = await response.json();
            setOrders(data);
            console.log(data)
        };
        fetchorders();
    }, [Auth]);
    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
                My Orders
            </Typography>
            {orders.length === 0 ? (
                <Typography variant="h6" sx={{ textAlign: 'center', color: 'text.secondary' }}>
                    You have no completed orders yet.
                </Typography>
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {orders.map((order, idx) => (
                        <Paper key={idx} sx={{ p: 3 }} elevation={3}>
                            <Typography variant="h6" sx={{ mb: 1 }}>
                                Address: {order.address}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                Total Price: {order.totalprice} Riyal
                            </Typography>
                            <Divider sx={{ my: 1 }} />
                            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                Items:
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                {order.items.map((item, i) => (
                                    <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, borderRadius: 1, bgcolor: '#f9f9f9' }}>
                                        <Typography>{item.itemname}</Typography>
                                        <Typography>Qty: {item.quantity}</Typography>
                                        <Typography>Price: {item.price} Riyal</Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Paper>
                    ))}
                </Box>
            )}
        </Container>
    );
}