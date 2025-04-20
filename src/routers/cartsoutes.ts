import { completeorder } from './../servcies/cartservies';
import { AuthenticatedRequest } from './../middleware/jwtvaldite';
import express from "express";
import { addnewproudct, deleteAll, deleteitem, getuseractivecard, updatecart } from "../servcies/cartservies";
import valditejwt from "../middleware/jwtvaldite";

const routercart = express.Router();

routercart.get("/", valditejwt, async (req: any, res) => {
    try {
        const userId = req.user._id;
        const activeCart = await getuseractivecard({ userid: userId });
        res.status(200).send(activeCart);
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error" });
    }
});

routercart.post("/", valditejwt, async (req: any, res) => {
    try {
        const userid = req.user._id;
        const { proudctid, quantity } = req.body;
        const proudct = await addnewproudct({ userid, proudctid, quantity });
        res.status(proudct.statuscode).send(proudct.data);
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error" });
    }
});

routercart.put("/", valditejwt, async (req: any, res) => {
    try {
        const userid = req.user._id;
        const { proudctid, quantity } = req.body;
        const proudct = await updatecart({ userid, proudctid, quantity });
        res.status(proudct.statuscode).send(proudct.data);
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error" });
    }
});

routercart.delete("/:id", valditejwt, async (req: AuthenticatedRequest, res) => {
    try {
        const userid = req.user._id;
        const { proudctid } = req.body;
        const proudct = await deleteitem({ userid, proudctid });
        res.status(proudct.statuscode).send(proudct.data);
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error" });
    }
});

routercart.delete("/all", valditejwt, async (req: AuthenticatedRequest, res) => {
    try {
        const userid = req.user._id;
        const proudct = await deleteAll(userid);
        res.status(proudct.statuscode).send(proudct.data);
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error" });
    }
});

routercart.post("/complete", valditejwt, async (req: AuthenticatedRequest, res) => {
    try {
        const userid = req.user._id;
        const { address } = req.body;
        const proudct = await completeorder({ userid, address });
        res.status(proudct.statuscode).send(proudct.data);
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error" });
    }
});

export default routercart;
