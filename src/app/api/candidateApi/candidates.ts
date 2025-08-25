import { apiRequest } from "@/services/axiosServices/apiService";
interface getAllprops {
  token?: string|null;
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
