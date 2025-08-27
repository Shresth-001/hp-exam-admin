"use client";
import { useQuestion } from "@/hooks/questionHooks/useQuestion";
import { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import Ques from "./question";
import Edit from "../editQuestion/editQuestion";
import Loader from "@/components/loader/loader";
import ReactSpinner from "@/components/loader/reactSpinner";
import SpinnerLoader from "@/components/loader/loader";
import toast from "react-hot-toast";
type OptionId = "Frontend" | "Backend" | "Sales" | "Others";
interface props {
  stream: OptionId | null | undefined;
  set: string | null | undefined;
}
interface QuestionType {
  id: number;
  is_selected:boolean
  question_text: string;
  options?: string[];
  question_type: string;
  answer:string;
}
export default function ShowQuestion({ stream, set }: props) {
  const { questions, isLoading, isError, error, deleteQuestionMutation } =useQuestion({ stream, set });
  const [isEdit, setIsEdit] = useState<boolean>();
  const [editQuestion, setEditQuestion] = useState<QuestionType | null>(null);
  const [totalSelected, setTotalSelected] = useState<number>(0);
  useEffect(() => {
    if(questions){
    const selectedCount = questions.filter((q:QuestionType) => q.is_selected).length;
    setTotalSelected(selectedCount);
  }
  }, [questions]);
  const handleDelete = (id: number) => {
    deleteQuestionMutation.mutate(id,{
      onSuccess:(data)=>{
        toast.success("Question is deleted Successfully")
      }
    });
  };
  const handleEdit = (question: QuestionType) => {
    setIsEdit(true);
    setEditQuestion(question);
  };
  const closeModel = () => {
    setIsEdit(false);
    setEditQuestion(null);
  };
  
  if (isLoading)
    return (
      <div>
         <ReactSpinner/>
      </div>
    );
  if (error) return <p className="font-bold text-2xl">Something went wrong</p>;
  
  return (
    <>
    <div className="text-lg font-mono">
          <p>{totalSelected} Out of {questions.length} Selected</p>
        </div>
      <div className="space-y-4 overflow-auto mt-5 mb-5 ">
        
        {questions.map((question: QuestionType) => (
          <Ques
            key={question.id}
            handleEdit={()=>handleEdit(question)}
            question={question}
            handleDelete={handleDelete}
          />
        ))}
        {isEdit && (
          <div className="fixed inset-0 bg-black/30  flex items-center justify-center z-50">
            <Edit stream={stream} set={set} passedQuestion={editQuestion} onClose={closeModel} />
          </div>
        )}
      </div>
    </>
  );
}
