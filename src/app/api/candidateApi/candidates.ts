
import { apiRequest } from "@/services/axiosServices/apiService";
interface getAllprops {
  token?: string|null;
}
interface getCandidateById{
    token?:string|null;
    user_id?: string|null;
}
export const getAllCandidate = async ({ token }: getAllprops) => {
  try {
    const res = await apiRequest("get", "/dashboard/candidates", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    if(res.success){
        return {success:true,data:res.data.data.candidates}
    }else{
        return {
        success: res.success,
        status: res.status,
        details: res.details,
      };
    }

  } catch (error:any) {
    return {
      success: false,
      errors: { message: error.message || "Network or server error" },
    };
  }
};
export const getCandidateById=async({user_id,token}:getCandidateById)=>{
  console.log(user_id,token);
    try{
        const res=await apiRequest('get',`/dashboard/candidates/${user_id}`,{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if(res.success){
        return res.data.data;
    }else{
        return {
        success: res.success,
        status: res.status,
        details: res.details,
      };
    } 
    }catch(error:any){
        return {
      success: false,
      errors: { message: error.message || "Network or server error" },
    };
    }
}
export const deleteUser=async({user_id,token}:getCandidateById)=>{

    try {
        const res = await apiRequest("delete", `/dashboard/delete-candidates/${user_id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if(res.success){
        return res.data;
    }else{
        return {
        success: res.success,
        status: res.status,
        details: res.details,
      };
    } 
    }catch(error:any){
        return {
      success: false,
      errors: { message: error.message || "Network or server error" },
    };
    }
}
