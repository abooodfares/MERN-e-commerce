
import { Userinterface } from "../types/userinterface";

export const RegisterUser = async (data: Userinterface) => await fetch('http://localhost:3000/users/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
});