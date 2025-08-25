import { apiRequest } from "@/services/axiosServices/apiService";
import axios from "axios";
import { headers } from "next/headers";
type OptionId = "Frontend" | "Backend" | "Sales" | "Others";
interface props {
  stream?: OptionId | null;
  set?: string | null;
  token?: string;
}
interface QuestionType {
  jobRole?: "Frontend" | "Backend" | "Sales" | "Others";
  paperSet?: "A" | "B" | "C" | "D";
  question_text?: string;
  question_type?: string;
  options?: string[];
  answer?:string;
}
interface UpdateQuestionType {
  id:number;
  question_text?: string;
  question_type?: string;
  options?: string[];
  answer:string;
}
interface addProps{
    question:QuestionType|null;
    token?:string;
}
interface updateProps{
    question:UpdateQuestionType;
    token?:string;
}
export const getQuestion = async ({ stream, set, token }: props) => {
  if (!stream || !set) {
    return [];
  }
  try {
const res=await apiRequest('get',`/questions/fetch?jobRole=${stream}&paperSet=${set}`,{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
})
    console.log(res);
    if (res.success) {
      return res.data.data.questions;
    }
  } catch (error) {
    throw error;
  }
};
export const deleteQuestion=async(id:number,token:string)=>{

    try {
        const res = await apiRequest("delete", `/questions/delete/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    } catch (error) {
        throw error;
    }
}
export const addQuestion=async({question,token}:addProps)=>{
    try {
        const res=await apiRequest('post','/questions/create',question,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            }
        })
        console.log(res);
        if(res.success){
          return res.data;
        }
        return res;
    } catch (error) {
        throw error;
    }
}
export const updateQuestion=async({question,token}:updateProps)=>{
    const {id}=question;
    try {
        const res=await apiRequest('put',`/questions/update/${id}`,question,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            }
        })
        console.log(res);
        if(res.success){
            return res.data
        }
        return res;
    } catch (error) {
        throw error;
    }
}


