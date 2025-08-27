"use client";

import Button from "@/components/button/button";
import SubmitButton from "@/components/button/submitButton";
import InputField from "@/components/inputFields/inputField";
import { useQuestion } from "@/hooks/questionHooks/useQuestion";
import React, { InputHTMLAttributes, useState } from "react";
import toast from "react-hot-toast";
import {
  FaArrowAltCircleRight,
  FaCross,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import { FaX } from "react-icons/fa6";
type setId="A" | "B" | "C" | "D";
interface QuestionType {
  jobRole?: "Frontend" | "Backend" | "Sales" | "Others";
  paperSet?: "A" | "B" | "C" | "D";
  question_text?: string;
  question_type?: string;
  options?: string[];
  answer?: string;
}
interface QuestionErrorType {
  question_text?: string;
  option?: string;
  answer?: string;
}
interface props {
  onClose: () => void;
  stream?: "Frontend" | "Backend" | "Sales" | "Others";
  set?: setId | null;
}
export default function AddQuestion({ set, stream, onClose }: props) {
  const { addQuestionMutation } = useQuestion({ stream, set });
  const [errorList, setErrorList] = useState<QuestionErrorType | null>({
    question_text: "",
    option: "",
    answer: "",
  });
  const [question, setQuestion] = useState<QuestionType | null>({
    jobRole: stream?stream:"Frontend",
    paperSet: set?set:"A",
    question_text: "",
    question_type: "objective",
    options: [],
    answer: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorList((prev) => ({
      ...prev,
      question_text: "",
      answer: "",
    }));
    const { name, value } = e.target;
    setQuestion((prev): QuestionType | null => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setErrorList((prev) => ({
      ...prev,
      option: "",
    }));
    const { name, value } = e.target;
    setQuestion((prev): QuestionType | null => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleOptionChange = (index: number, value: string) => {
    setQuestion((prev) => {
      const newOption = [...(prev?.options || [])];
      newOption[index] = value;
      return {
        ...prev,
        options: newOption,
      };
    });
  };
  const removeOption = (index: number) => {
    setQuestion((prev) => ({
      ...prev,
      options: (prev?.options || []).filter((_, i) => i != index),
    }));
  };
  const addOption = () => {
    setErrorList((prev) => ({
      ...prev,
      option: "",
    }));
    if (question?.options) {
      if (question?.options?.length >= 4) {
        return;
      }
    }
    setQuestion((prev) => ({
      ...prev,
      options: [...(prev?.options || []), ""],
    }));
  };
  const handleSubmit = () => {
    let error: any = [];
    if (question?.question_text?.trim() === "") {
      error.question_text = "Please Write a valid Question";
    }
    if (question?.answer?.trim() === "") {
      error.answer = "Please Add Answer";
    }
    if (question?.question_type?.trim() === "objective") {
      if (question?.options) {
        if (question.options.length < 4) {
          error.option = "Please add more Options";
        }
      }
    }
    setErrorList(error);
    if (Object.keys(error).length > 0) {
      return;
    }
    setErrorList(null);
    addQuestionMutation.mutate(question, {
      onSuccess: (data) => {
        // console.log(data);
        if (!data.success) {
          toast.error(data.details.message);
            return;
        }
        if (data) {
          toast.success("Question Added sucessfully");
          onClose();
        }
        
      },
      onError: (error) => {
        //  toast.error("Question not added please try again");
      //  new Promise((resolve)=>(resolve(toast.error("Question not added please try again")),5000));
      },
    });
  };
  return (
    <>
      <div className="bg-white w-1/2 p-10 rounded-2xl">
        <div className="flex item-center justify-end">
          <Button
            isPending={false}
            text={""}
            className={""}
            onClick={onClose}
            children={<FaX size={20} className="text-gray-300 font-bold" />}
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold flex item-center justify-center p-5">
            Add Question
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 px-5 mb-4">
            <div className="relative flex-1">
              <label
                htmlFor="jobRole"
                className="block  text-sm font-bold mb-2"
              >
                JobRole
              </label>
              <select
                name="jobRole"
                id="jobRole"
                value={question?.jobRole}
                onChange={handleSelectChange}
                className="p-2 border rounded w-full"
              >
                <option value="Frontend" className="">
                  Frontend
                </option>
                <option value="Backend" className=" ">
                  Backend
                </option>
                <option value="Sales" className=" ">
                  Sales
                </option>
                <option value="Others" className=" ">
                  Others
                </option>
              </select>
            </div>
            <div className="relative flex-1">
              <label
                htmlFor="paperSet"
                className="block  text-sm font-bold mb-2"
              >
                PaperSet
              </label>
              <select
                name="paperSet"
                id="paperSet"
                value={question?.paperSet}
                onChange={handleSelectChange}
                className="p-2 border rounded w-full"
              >
                <option value="A" className="">
                  A
                </option>
                <option value="B" className=" ">
                  B
                </option>
                <option value="C" className=" ">
                  C
                </option>
                <option value="D" className=" ">
                  D
                </option>
              </select>
            </div>
          </div>
          <div className=" flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 px-5">
            <div className="relative flex-1">
              <InputField
                value={question?.question_text || ""}
                type="text"
                name="question_text"
                className={
                  "peer  border-b-2 mr-10 border-gray-300 bg-transparent pt-4 px-3 pb-1  text-lg leading-5 focus:outline-0 w-full"
                }
                placeholder={""}
                onChange={handleChange}
                error={errorList?.question_text}
              />
              <label className="label-floating " htmlFor="question_text">
                Question
              </label>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-5 px-5">
            <div className="relative flex-1">
              <label
                htmlFor="question_Type"
                className="block  text-sm font-bold mb-2"
              >
                Question Type
              </label>
              <select
                name="question_type"
                id="question_type"
                value={question?.question_type}
                onChange={handleSelectChange}
                className="p-2 border rounded w-full"
              >
                <option value="objective" className="">
                  Objective
                </option>
                <option value="subjective">Subjective</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 px-5">
            <div className="relative flex-1">
              {errorList?.option && (
                <div className="text-red-500 text-lg">{errorList.option}</div>
              )}
              {question?.question_type === "objective" && (
                <div className="mb-4">
                  <h3 className="font-semibold text-lg">Add Options</h3>
                  {(question.options || []).map((optionText, index) => (
                    <div key={index} className="mb-2 flex item-center">
                      <strong className="mt-4 mr-2">
                        {String.fromCharCode(65 + index)}
                      </strong>
                      <InputField
                        value={optionText}
                        name={`Option-${index}`}
                        className={"p-2 rounded border w-full mr-2"}
                        placeholder={`Option-${String.fromCharCode(
                          65 + index
                        )}`}
                        onChange={(e) =>
                          handleOptionChange(index, e.target.value)
                        }
                      />
                      <Button
                        isPending={false}
                        text={""}
                        className={""}
                        onClick={() => removeOption(index)}
                        children={
                          <FaTrash
                            size={20}
                            className="text-gray-300 mr-2 mt-4 hover:text-gray-500"
                          />
                        }
                      />
                    </div>
                  ))}
                  <Button
                    isPending={false}
                    text={""}
                    className={
                      "flex item-center justify px-6 py-1 rounded-2xl gap-1 bg-gradient-to-r from-[#ff3c57] to-[#ff7861] text-white whitespace-nowrap hover:from-[#ff5e7b] hover:to-[#ff9b7c] hover:shadow-lg hover:shadow-pink-400/50 transition-all duration-300"
                    }
                    onClick={addOption}
                    children={<FaPlus size={20} className="text-white" />}
                  />
                </div>
              )}
            </div>
          </div>
          <div className=" flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 px-5">
            <div className="relative flex-1">
              <InputField
                value={question?.answer || ""}
                type="text"
                name="answer"
                className={
                  "peer  border-b-2 mr-10 border-gray-300 bg-transparent pt-4 px-3 pb-1  text-lg leading-5 focus:outline-0 w-full"
                }
                placeholder={""}
                onChange={handleChange}
                error={errorList?.answer}
              />
              <label className="label-floating " htmlFor="answer">
                Answer
              </label>
            </div>
          </div>
          <div className="flex item-center justify-center">
            <SubmitButton
              type="submit"
              isPending={false}
              handleSubmit={handleSubmit}
              text={"Add"}
              className="group w-85 rounded-3xl px-10 py-2 font-semibold flex items-center justify-center bg-gradient-to-r from-[#ff3c57] to-[#ff7861] text-white whitespace-nowrap
                                    hover:from-[#ff5e7b] hover:to-[#ff9b7c] hover:shadow-lg hover:shadow-pink-400/50 transition-all duration-300"
              children={
                <FaArrowAltCircleRight className="h-6 w-6 text-gray-50 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}
