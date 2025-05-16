import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import router from './routers/userrouter';
import { makefakeproduct } from './servcies/proudctservies';
import proudectsrouter from './routers/proudctsrouter';
import routercart from './routers/cartsoutes';
import cors from 'cors';
import { rateLimiter } from './middleware/ratelimiter';

dotenv.config();
mongoose.connect(process.env.Database_url ||'').then(() => {
    console.log('Connected to MongoDB');
}).catch(() => {
    console.log('Failed to connect to MongoDB');
});

const app = express();
app.use(rateLimiter);

app.use(cors());
app.use(express.json());


// Apply routes
app.use('/users', router);
app.use('/products', proudectsrouter);
app.use('/carts', routercart);

// Initialize fake products
makefakeproduct();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});