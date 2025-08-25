'use client'
import Button from "@/components/button/button";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
type setId="A" | "B" | "C" | "D";
interface props{
    handleSet:(data:setId)=>void
}

export default function QuestionSet({handleSet}:props) {
  const[selected,setSelected]=useState<string|null>('A');
    return (
    <div>
      <div className=" bg-white w-full  rounded-xl shadow-lg p-3 " >
        <div
          className=""
        >
          <h2 className="text-2xl font-semibold mb-4">
            Select the question set
          </h2>
          <div className="flex flex-row-1 w-full text-lg gap-4">
            {(["A", "B", "C", "D"] as setId[]).map((set) => (
              <Button
              key={set}
                isPending={false}
                text={set}
                className={twMerge(
                  "px-6 py-1 border border-gray-300 rounded w-1/2 p-5",
                  selected===set
                  ?"border-[#ff3c57] bg-white/30 backdrop-blur-sm shadow-md transition-all transform-3d border-1 "
                  :'border-gray-200 hover:border-blue-300 hover:bg-[#ff3c57] hover:text-white'
                )}
                onClick={() => {
                  setSelected(set);
                    handleSet(set);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
