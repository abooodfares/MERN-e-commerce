import { IUser } from '../models/users'; // This should match your User schema interface
import userModel from '../models/users';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface LoginParams {
  email: string;
  password: string;
}

export async function Register({ email, password, firstname, lastname }: IUser) {
  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return {
        data: 'The user already exists',
        statuscode: 400,
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userToCreate = new userModel({
      email,
      password: hashedPassword,
      firstname,
      lastname,
    });

    const savedUser = await userToCreate.save();

    return {
      data: generateToken({ email: savedUser.email }),
      statuscode: 200,
    };
  } catch (error) {
    console.error("Register Error:", error);
    return {
      data: 'Something went wrong during registration',
      statuscode: 500,
    };
  }
}

export async function Login({ email, password }: LoginParams) {
  try {
    const user = await userModel.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
      return {
        data: generateToken({ email: user.email }),
        statuscode: 200,
      };
    }

    return {
      data: 'Invalid email or password',
      statuscode: 400,
    };
  } catch (error) {
    console.error("Login Error:", error);
    return {
      data: 'Something went wrong during login',
      statuscode: 500,
    };
  }
}

function generateToken(data: any): string {
  return jwt.sign(data, 'asdkfcckdxcovekdcoekcovcke3ppss', { expiresIn: '7d' });
}
