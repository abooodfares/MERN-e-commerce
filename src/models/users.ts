import mongoose from "mongoose";
export interface IUser extends mongoose.Document {
    firstname: string;
    lastname: string;
    password: string;
    email: string;
    
}

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
});

 const Usermodel = mongoose.model<IUser>("Users", userSchema);
 export default Usermodel