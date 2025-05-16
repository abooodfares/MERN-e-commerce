import Express, { RequestHandler } from "express";
import { getallproduct } from "../servcies/proudctservies";
import { createClient } from 'redis';

const productsRouter = Express.Router();
const redis = createClient({
  url: 'redis://127.0.0.1:6379'
});

redis.connect()
  .then(() => console.log('Connected to Redis'))
  .catch(console.error);

const getProducts: RequestHandler = async (req, res, next) => {
  try {
    const cacheKey = 'products';
    const cachedData = await redis.get(cacheKey);
   

    if (!cachedData) {
      const products = await getallproduct();
      const jsonProducts = JSON.stringify(products);
      await redis.set(cacheKey, jsonProducts, {
        EX: 600 // Cache for 10 minutes
      });
      res.status(200).json(products);
      return;
    }
    
    const parsedProducts = JSON.parse(cachedData);
    res.status(200).json(parsedProducts);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

productsRouter.get('/', getProducts);

export default productsRouter;
