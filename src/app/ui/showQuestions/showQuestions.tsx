"use client";
import { useQuestion } from "@/hooks/questionHooks/useQuestion";
import { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import Ques from "./question";
import Edit from "../editQuestion/editQuestion";
import Loader from "@/components/loader/loader";
import ReactSpinner from "@/components/loader/reactSpinner";
import SpinnerLoader from "@/components/loader/loader";
type OptionId = "Frontend" | "Backend" | "Sales" | "Others";
interface props {
  stream: OptionId | null | undefined;
  set: string | null | undefined;
}
interface QuestionType {
  id: number;
  question_text: string;
  options?: string[];
  question_type: string;
  answer:string;
}
export default function ShowQuestion({ stream, set }: props) {
  const { questions, isLoading, isError, error, deleteQuestionMutation } =useQuestion({ stream, set });
  const [isEdit, setIsEdit] = useState<boolean>();
  const [editQuestion, setEditQuestion] = useState<QuestionType | null>(null);
  const handleDelete = (id: number) => {
    deleteQuestionMutation.mutate(id);
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
