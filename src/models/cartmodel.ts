import e from "express";
import mongoose, { Schema } from "mongoose";
import { IProduct } from "./proudctmodel";
import { IUser } from "./users";
enum statusenum{
    active='active',
    completd='completed'
}
interface proudct{
    item:IProduct
    quantity:number
    unitprice:number
}
interface iCart{
    userid:IUser
    items:proudct[]
    totalprice:number
    status:statusenum
}
const proudctschema= new Schema<proudct>({
    item:{
        type:Schema.Types.ObjectId,
        ref:'Products'
    },
    quantity: Number,
    unitprice: Number
})
const cartSchema = new Schema<iCart>({
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    items: [proudctschema],
    totalprice: {
        type:Number,
        default: 0
    },
    status: {
        type: String,
        enum: Object.values(statusenum),
        default: statusenum.active
        
    }
})

const Cartmodel = mongoose.model<iCart>("Carts", cartSchema);
export default Cartmodel