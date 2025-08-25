"use client";

import Button from "@/components/button/button";
import SubmitButton from "@/components/button/submitButton";
import InputField from "@/components/inputFields/inputField";
import { useQuestion } from "@/hooks/questionHooks/useQuestion";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
type OptionId = "Frontend" | "Backend" | "Sales" | "Others";
interface Question {
  id: number;
  question_text: string;
  options?: string[];
  question_type: string;
  answer:string;
}
interface ErrorType {
  question_text: string;
  options?: string;
  answer:string;
}
interface props {
  passedQuestion: Question | null;
  onClose: () => void;
  stream?:OptionId|null;
  set?:string|null;
}
export default function Edit({set,stream, passedQuestion, onClose }: props) {
  if (!passedQuestion) {
    return <div>No Choosed Question</div>;
  }
  console.log(passedQuestion);
  const{updateQuestionMutation}=useQuestion({stream,set});
  const [errorList,setErrorList]=useState<ErrorType|null>({
  question_text:'',
  options: '',
  answer:'',
  })
  const [question, setQuestion] = useState(() => {
  if (!passedQuestion) {
    return {
      id: 0, 
      question_text: "",
      question_type: "objective",
      options: [],
      answer:"",
    };
  }

  const optionsArray =
    passedQuestion.question_type === "objective" && passedQuestion.options
      ? Object.values(passedQuestion.options) 
      : passedQuestion.options || [];

  return {
    id: passedQuestion.id,
    question_text: passedQuestion.question_text,
    question_type: passedQuestion.question_type,
    options: optionsArray,
    answer:passedQuestion.answer,
  };
});
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setQuestion((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setQuestion((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleOptionsChange = (index: number, value: string) => {
    setQuestion((prev) => {
      const newOption = [...(prev.options || [])];
      newOption[index] = value;
      return {
        ...prev,
        options: newOption,
      };
    });
  };
  const addOption = () => {
    setQuestion((prev) => ({
      ...prev,
      options: [...(prev.options || []), ""],
    }));
  };
  const removeOption = (index: number) => {
    setQuestion((prev) => ({
      ...prev,
      options: (prev.options || []).filter((_, i) => i != index),
    }));
  };
  const handleSubmit=()=>{
    const errors: ErrorType = {
    question_text: '',
    options: '',
    answer:'',
  };

  let hasErrors = false;

  if (question.options.length < 4) {
    errors.options = 'Please Add More Option';
    hasErrors = true;
  }

  if (question.question_text.trim() === '') {
    errors.question_text = 'Please Add a valid question';
    hasErrors = true;
  }
  if (question?.answer?.trim() === '') {
    errors.question_text = 'Please Add a valid Answer';
    hasErrors = true;
  }

  setErrorList(hasErrors ? errors : null);

  if (hasErrors) {
    return;
  }
    setErrorList(null);
    // const data={
    //   jobRole: stream,
    //   paperSet:set,
    //   ...question
    // }
    updateQuestionMutation.mutate(question,{
      onSuccess:(data)=>{
        if (!data.success) {
          toast.error(data.details.message);
          return;
        }
        if (data) {
          toast.success("Question Updated sucessfully");
          onClose();
        }
      },
       onError:(error)=>{

      }
    })
    
  }
  return (
    <>
      <div className=" w-1/2 bg-white p-10 rounded-2xl shadow-md ">
      <div className="flex item-center justify-end">
                <Button
                  isPending={false}
                  text={""}
                  className={""}
                  onClick={onClose}
                  children={<FaX size={20} className="text-gray-300 font-bold"/>}
                />
              </div>
        <h2 className="text-2xl font-bold mb-4">Edit Question</h2>
        <InputField
          value={question.question_text}
          name={"question_text"}
          className={"mb-4 p-2 rounded w-full"}
          placeholder={"Enter the Question"}
          onChange={(e) => handleTextChange(e)}
          error={errorList?.question_text}
        />
        <div>
          <label
            htmlFor="questionType"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Question Type
          </label>
          <select
            name="question_type"
            id="question_type"
            value={question.question_type}
            onChange={handleSelectChange}
            className="p-2 border rounded w-full"
          >
            <option value="objective">Objective</option>
            <option value="subjective">Subjective</option>
          </select>
        </div>
        <div>
          {question.question_type === "objective" && (
            <div className="mb-4">
              <div>
                {errorList?.options&&(
                  <div className="text-red-500 text-lg">{errorList.options}</div>
                )}
              </div>
              <h3 className="text-lg font-semibold mb-2">Options</h3>
              {(question.options || []).map((optionText, index) => (
                <div key={index} className="flex item-center mb-2">
                  <strong className="mt-4 mr-2">
                    {String.fromCharCode(65 + index)}
                  </strong>
                  <InputField
                    value={optionText}
                    name={`option-${index}`}
                    className={"p-2 rounded border w-full mr-2"}
                    placeholder={`Option ${String.fromCharCode(65 + index)}`}
                    onChange={(e) => handleOptionsChange(index, e.target.value)}
                  />
                  <div>
                    <Button
                      isPending={false}
                      text={""}
                      onClick={() => removeOption(index)}
                      className={" text-white px-3 py-1 rounded "}
                      children={
                        <FaTrash
                          size={20}
                          className="hover:text-gray-600 text-gray-300 mr-2"
                        />
                      }
                    />
                  </div>
                </div>
              ))}
              <Button
                isPending={false}
                text={""}
                onClick={addOption}
                className={"px-6 py-2 rounded-2xl bg-[#ff3c57]"}
                children={
                  <FaPlus
                    size={20}
                    className="text-white hover:text-white/30"
                  />
                }
              />
            </div>
          )}
        </div>
        <div>
           <InputField
          value={question.answer||""}
          name={"answer"}
          className={"mb-4 p-2 rounded w-full"}
          placeholder={"Enter the Answer"}
          onChange={(e) => handleTextChange(e)}
          error={errorList?.answer}
        />
        </div>
        <div className="flex item-center justify-center">
          <SubmitButton
            isPending={false}
            handleSubmit={handleSubmit}
            text={"Save"}
            className={"px-8 flex item-center justify-center py-2 rounded-2xl bg-gradient-to-r from-[#ff3c57] to-[#ff7861] text-white whitespace-nowrap hover:from-[#ff5e7b] hover:to-[#ff9b7c] hover:shadow-lg hover:shadow-pink-400/50 transition-all duration-300"}
            children={<FaPlus size={25} className="text-white"/>}
          />
        </div>
      </div>
    </>
  );
}
