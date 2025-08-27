import { deleteQuestion, getQuestion,addQuestion, updateQuestion, updateSelectedQuestion } from "@/app/api/questionApi/question";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
type OptionId='Frontend'|'Backend'|'Sales'|'Others'
interface props{
    stream?:OptionId|null;
    set?:string|null;
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
interface updateSelectQuestionProps{
    is_selected:boolean;
    id:number;
}
export const useQuestion=({set,stream}:props)=>{
    const queryClient=useQueryClient();
    const token:any=localStorage.getItem('token')
    // console.log(token)
    const{data:questions,isLoading,isError,error}=useQuery({
        queryKey:['question',stream,set],
        queryFn:()=>getQuestion({stream,set,token}),
        enabled: !!stream && !!set,
        staleTime: 1000 * 60 * 2,
    })
    const deleteQuestionMutation=useMutation({
        mutationFn:async(id:number)=>{
            return await deleteQuestion(id,token);
        },
        onSuccess:()=>{
            console.log("Delete question reached");
            queryClient.invalidateQueries({queryKey:['question',stream,set]});
        }
    })
    const addQuestionMutation=useMutation({
        mutationFn:async(question:QuestionType|null)=>{
            return await addQuestion({question,token});
        },
        onSuccess:(data)=>{
            queryClient.invalidateQueries({queryKey:['question',stream,set]})
        },
    })
    
    const updateQuestionMutation=useMutation({
        mutationFn:async(question:UpdateQuestionType)=>{
            return await updateQuestion({question,token})
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['question',stream,set]});
        }
    })
    const updateSelectQuestion=useMutation({
        mutationFn:async({id,is_selected}:updateSelectQuestionProps)=>{
            return await updateSelectedQuestion({is_selected,id,token})
        },
        onSuccess:(data)=>{

            queryClient.invalidateQueries({queryKey:['question',data.data.jobRole,data.data.paperSet]})
        }
    })
    
    return {updateSelectQuestion,questions,isLoading,isError,error,deleteQuestionMutation,addQuestionMutation,updateQuestionMutation};
}