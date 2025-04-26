import { createContext, useContext } from "react";

interface IAuthContext{
    email : string
    token : string
    login : (email : string , token : string) => void
}
export const Authcontext=createContext<IAuthContext| null>(null)
export const useauth=()=>useContext(Authcontext)