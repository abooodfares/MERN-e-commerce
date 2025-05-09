import { BASE_URL } from "../constant/myconst";
import { LoginParams, Userinterface } from "../types/userinterface";

export const RegisterUser = async (data: Userinterface) => await fetch(BASE_URL+'/users/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
});

export const LoginUser = async (data: LoginParams) => await fetch(BASE_URL+'/users/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
});

export const GetCartItems = async (token: string) => await fetch(BASE_URL+'/carts', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
});

export const AddCartItem = async (token: string, data: any) => await fetch(BASE_URL+'/carts', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
});
export const UpdateCartItem = async (token: string, proudctid: string, quantity: number) => await fetch(BASE_URL+'/carts', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({proudctid, quantity}),
});
export const DeleteCartItem = async (token: string, proudctid: string) => await fetch(BASE_URL+'/carts', {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({proudctid}),
});

export const DeleteAllCartItems = async (token: string) => await fetch(BASE_URL+'/carts/all', {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
});

export const CompleteOrder = async (token: string, data: { address: string }) => await fetch(BASE_URL+'/carts/complete', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
});

export const GetAllCompletedOrders = async (token: string) => await fetch(BASE_URL+'/carts/orders', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
});