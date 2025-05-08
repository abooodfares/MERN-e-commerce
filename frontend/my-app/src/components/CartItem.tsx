import { Box, Typography, IconButton, Button } from "@mui/material"
import { ProductCart } from "../types"
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface CartItemProps {
    item: ProductCart;
}

export const CartItem = ({ item }: CartItemProps) => {
    return (
        <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            p: 2, 
            border: '1px solid #e0e0e0',
            borderRadius: 1,
            transition: 'all 0.3s ease',
            '&:hover': {
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                transform: 'translateY(-2px)'
            }
        }}>
            <Box
                component="img"
                src={`/${item.img}`}
                alt={item.name}
                sx={{ 
                    width: 100, 
                    height: 100, 
                    objectFit: 'cover', 
                    mr: 2,
                    borderRadius: 1
                }}
            />
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>{item.name}</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>
                    Price: {item.unitPrice} Riyal
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton 
                        size="small" 
                        color="primary"
                        sx={{ 
                            border: '1px solid',
                            '&:hover': {
                                backgroundColor: 'primary.light',
                                color: 'white'
                            }
                        }}
                    >
                        <RemoveIcon />
                    </IconButton>
                    <Typography variant="body1" sx={{ minWidth: '30px', textAlign: 'center' }}>
                        {item.quantity}
                    </Typography>
                    <IconButton 
                        size="small" 
                        color="primary"
                        sx={{ 
                            border: '1px solid',
                            '&:hover': {
                                backgroundColor: 'primary.light',
                                color: 'white'
                            }
                        }}
                    >
                        <AddIcon />
                    </IconButton>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                    {item.unitPrice * item.quantity} Riyal
                </Typography>
                <IconButton 
                    color="error"
                    sx={{ 
                        '&:hover': {
                            backgroundColor: 'error.light',
                            color: 'white'
                        }
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            </Box>
        </Box>
    );
} 