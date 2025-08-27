"use client";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import QuestionSet from "./questionSet";

type OptionId = "Frontend" | "Backend" | "Sales" | "Others";

interface Option {
  id: OptionId;
  label: string;
  icon: string;
}
interface streamSetProps{
  selected:OptionId|null|undefined;
  setSelected:(data:(OptionId| undefined))=>void;
  handleGet:()=>void;
  setError:(data:(string|undefined))=>void;
  error?:string;
}
export default function StreamSelection({selected,setSelected,error,handleGet,setError}:streamSetProps) {
  const handleDivClick = (optionId: OptionId) => {
    setSelected(optionId);
    setError(undefined);
  };
  const options: Option[] = [
    { id: "Frontend", label: "Frontend", icon: "💻" },
    { id: "Backend", label: "Backend", icon: "🖥️" },
    { id: "Sales", label: "Sales", icon: "📊" },
    { id: "Others", label: "Others", icon: "✨" },
  ];
  return (
    <div>
      <div className="grid grid-col-2 sm:flex sm:flex-row-1 gap-4">
        {options.map((option) => (
          <div
            key={option.id}
            onClick={(event)=>handleDivClick(option.id)}
            className={twMerge(
              "flex flex-col items-center w-full justify-center border-2 rounded-xl p-3 cursor-pointer transition-all",
              selected === option.id
                ? " border-[#ff3c57] bg-white/30 backdrop-blur-sm shadow-md transition-all transform-3d"
                : "border-gray-200 hover:border-blue-300 hover:bg-[#ff3c57] hover:text-white"
            )}
          >
            <span className="text-4xl mb-2">{option.icon}</span>
            <span className="text-lg font-medium">{option.label}</span>
          </div>
        ))}
      </div>
      {error && <div className="text-red-500 text-lg">{error}</div>}
    </div>
  );
}
