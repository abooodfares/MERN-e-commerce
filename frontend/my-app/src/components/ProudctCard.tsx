
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Product } from '../types/Productinterface';
import { useCart } from '../context/cart/cartcontext';

interface ProductCardProps extends Product {}

export default function ProductCard({ image, name, price, stock,_id }: ProductCardProps) {
  const { addProduct } = useCart();
  return (
    <Card

      sx={{
        minWidth: 345,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 2,
      }}
    >
      <CardMedia
        sx={{ height: 140, width: '100%' }}
        image={`/${image}`} // ✅ Corrected path
        title={name}
      />
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
          Price: {price} Riyal
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Stock: {stock}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Button
          onClick={() => addProduct(_id)}
          sx={{ mt: 1 }}
          disabled={stock === 0}
          variant="contained"
          size="small"
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}
