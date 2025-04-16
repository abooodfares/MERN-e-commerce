import { IUser } from './../models/users';
import userModel from '../models/users';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
interface LoginParams {
  password: string;
  email: string;
}

export async function Register({email,password,firstname,lastname}: IUser) {
  const existingUser = await userModel.findOne({ email: email });
  if (existingUser) {
    return (
      {
        data:'the user already exit',
        stauscode:400
      })
    }
   const newUser=await bcrypt.hash(password,10)
  const userToCreate = new userModel(newUser);
  const savedUser = await userToCreate.save();
  return (
    {
      data:genratetoken(
    {
  email
    }
       

      ),
      stauscode:200
    })
}

export async function Login({email,password}: LoginParams) {
  const user = await userModel.findOne({ email: email });
  if (user && await bcrypt.compare(password,user.password)) {
    return (
    {
      data:genratetoken({
        email
      }),
      stauscode:200
    })
    
  }
  return (
    {
      data:'invalid email or password',
      stauscode:400
    })
  
}
function genratetoken(data:any){
return jwt.sign(data,'asdkfcckdxcovekdcoekcovcke3ppss')
}