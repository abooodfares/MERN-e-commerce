import  express  from 'express';
import mongoose from 'mongoose';
import router from './routers/userrouter';
import { makefakeproduct } from './servcies/proudctservies';
import proudectsrouter from './routers/proudctsrouter';
import routercart from './routers/cartsoutes';

mongoose.connect('mongodb://localhost:27017/ecommerce').then(() => {
    console.log('Connected to MongoDB');
}).catch(() => {
    console.log('Failed to connect to MongoDB');
});


 const app = express();
 makefakeproduct()
 app.use(express.json());
 app.use('/users',router)

app.use('/products',proudectsrouter)
app.use('/carts',routercart)



 app.listen(3000, () => {
    console.log('Server is running on port 3000');
 });