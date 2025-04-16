import mongoose from "mongoose";
interface IProduct {
    name: string,
    price: number,
   stock: number
   
    image: string
}

const productSchema = new mongoose.Schema<IProduct>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        trim: true,
    },
    stock: {
        type: Number,
        required: true,
        trim: true,
        default: 0
    },
    image: {
        type: String,
        required: true,
        trim: true,
    },
});

const Productmodel = mongoose.model<IProduct>("Products", productSchema);
export default Productmodel
