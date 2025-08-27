import { Login } from "@/app/api/loginApi/adminLogin"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useLogin=()=>{
    const queryClient=useQueryClient();
    const adminLogin=useMutation({
        mutationFn:async(payload:FormData)=>{
            return await Login(payload)
        },
        onSuccess:(data)=>{
            // console.log(data);
            localStorage.clear();
            if(data.success){
                const token=data.data.token;
                localStorage.setItem('token',token);
                queryClient.setQueryData(['adminData'],{admin:data.data.admin});
                queryClient.setQueryData(['token'],{admin:data.data.token});
            }
        },
    })
    return adminLogin;
}