import { Login } from "@/app/api/loginApi/adminLogin"
import { useMutation } from "@tanstack/react-query"

export const useLogin=()=>{
    
    const adminLogin=useMutation({
        mutationFn:async(payload:FormData)=>{
            return await Login(payload)
        },
        onSuccess:(data)=>{
            console.log(data);
        },
        onError:(error)=>{
            console.log(error);
        }
    })
    return adminLogin;
}