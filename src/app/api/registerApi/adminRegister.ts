'use server'
import { apiRequest } from "@/services/axiosServices/apiService";
import { cookies } from "next/headers";

export const AdminRegister = async (formData: FormData) => {
  try {
    const res = await apiRequest("post", "/admin/register", formData);
    if (res.success) {
      const token = res.data.token;
      (await cookies()).set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24,
        path: "/",
      });
      return { success: true, data: res.data };
    } else {
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
