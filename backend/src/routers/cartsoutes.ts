import { completeorder, getallcompletedorders } from './../servcies/cartservies';
import { AuthenticatedRequest } from './../middleware/jwtvaldite';
import express, { Request, Response } from "express";
import { addnewproudct, deleteAll, deleteitem, getuseractivecard, updatecart } from "../servcies/cartservies";
import valditejwt from "../middleware/jwtvaldite";
import { createClient } from 'redis';

const routercart = express.Router();
const redis = createClient({
  url: 'redis://127.0.0.1:6379'
});

// Connect to Redis
redis.connect()
  .then(() => console.log('Successfully connected to Redis'))
  .catch(console.error);

// Handle Redis connection errors
redis.on('error', (err) => console.error('Redis Client Error', err));

routercart.get("/", valditejwt, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user._id;
        const activeCart = await getuseractivecard({ userid: userId });
        res.status(200).send(activeCart);
    } catch (error: any) {
        res.status(500).send({ error: "Internal Server Error", details: error.message });
    }
});

routercart.post("/", valditejwt, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userid = req.user._id;
        const { proudctid, quantity } = req.body;
        
        if (!proudctid || !quantity) {
            res.status(400).send({ 
                error: "Missing required fields", 
                required: { proudctid: "string", quantity: "number" } 
            });
            return;
        }

        const proudct = await addnewproudct({ userid, proudctid, quantity });
        res.status(proudct.statuscode).send(proudct.data);
    } catch (error: any) {
        res.status(500).send({ 
            error: "Internal Server Error", 
            details: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

routercart.put("/", valditejwt, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userid = req.user._id;
        const { proudctid, quantity } = req.body;
        const proudct = await updatecart({ userid, proudctid, quantity });
        res.status(proudct.statuscode).send(proudct.data);
    } catch (error: any) {
        res.status(500).send({ error: "Internal Server Error", details: error.message });
    }
});

routercart.delete("/", valditejwt, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userid = req.user._id;
        const { proudctid } = req.body;
        const proudct = await deleteitem({ userid, proudctid });
        res.status(proudct.statuscode).send(proudct.data);
    } catch (error: any) {
        res.status(500).send({ error: "Internal Server Error", details: error.message });
    }
});

routercart.delete("/all", valditejwt, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userid = req.user._id;
        const proudct = await deleteAll(userid);
        res.status(proudct.statuscode).send(proudct.data);
    } catch (error: any) {
        res.status(500).send({ error: "Internal Server Error", details: error.message });
    }
});

routercart.post("/complete", valditejwt, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userid = req.user._id;
        const { address } = req.body;
        const proudct = await completeorder({ userid, address });
        res.status(proudct.statuscode).send(proudct.data);
    } catch (error: any) {
        res.status(500).send({ error: "Internal Server Error", details: error.message });
    }
});

routercart.get("/orders", valditejwt, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userid = req.user._id;
        const orders = await getallcompletedorders({ userid });
        res.status(200).send(orders);
    } catch (error: any) {
        res.status(500).send({ error: "Internal Server Error", details: error.message });
    }
});

export default routercart;
