import { AdminRegister } from "@/app/api/registerApi/adminRegister"
import { useMutation } from "@tanstack/react-query"

export const useRegister=()=>{
    const adminRegister=useMutation({
        mutationFn: async(payload:FormData)=>{
            return await AdminRegister(payload);
        },
        onSuccess:(data)=>{
            // console.log(data);
        },
    })
    return adminRegister;
}