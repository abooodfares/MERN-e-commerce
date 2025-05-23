import { PropsWithChildren, useState } from "react";
import { Authcontext } from "./authcontext";

export const AuthProvider: React.FC<PropsWithChildren> = ({ children}) => {
    const [email, setEmail] = useState(localStorage.getItem('email') || '');
    const [token, setToken] = useState(localStorage.getItem('token') || '');

;    const login = (email: string, token: string) => {
        setEmail(email);
        setToken(token);
        //local storage
        localStorage.setItem('email', email);
        localStorage.setItem('token', token);

    };
    const logout = () => {
        setEmail('');
        setToken('');
        localStorage.removeItem('email');
        localStorage.removeItem('token');
    }

    
    return (
        <Authcontext.Provider value={{ email, token, login, logout  }}>
            {children}
        </Authcontext.Provider>
    );
};