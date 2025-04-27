
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