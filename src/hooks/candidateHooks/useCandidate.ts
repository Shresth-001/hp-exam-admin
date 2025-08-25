import { getAllCandidate } from "@/app/api/candidateApi/candidates"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react";

export  const useCandidate=()=>{
    const[token,setToken]=useState<string|null>();

    useEffect(()=>{
        const storedToken=localStorage.getItem('token')
        if(token){
            setToken(storedToken);
        }
    },[])
     const queryClient=useQueryClient();
    // 
    const{data:candidates,isLoading,isError,error}=useQuery({
        queryKey:['candidates'],  
        queryFn:()=>getAllCandidate({token}),
        staleTime: 1000 * 60 * 5,      
    })

    return {candidates,isLoading,isError,error};
}