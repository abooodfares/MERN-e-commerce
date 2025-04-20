import mongoose, { Schema } from "mongoose";

export interface IOrderitem {
    itemname: string;
    quantity: number;
    price: number;
}
interface IOrder {
  
    userid: object| string;
  
    totalprice: number;
   address:string;
    items: IOrderitem[];
   
}
const itemorderSchema = new mongoose.Schema<IOrderitem>({
    itemname: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
})

const orderSchema = new mongoose.Schema<IOrder>({
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    items: [
      itemorderSchema
    ],
    totalprice: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
});

const Ordermodel = mongoose.model<IOrder>("Orders", orderSchema);
export default Ordermodel