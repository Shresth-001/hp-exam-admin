"use client";

import { Suspense, useEffect, useState } from "react";
import StreamSelection from "../selection/streamSelection";
import ShowQuestion from "../showQuestions/showQuestions";
import Button from "@/components/button/button";
import AddQuestion from "../addQuestion/addQuestion";
import QuestionSet from "../selection/questionSet";
import Loader from "@/components/loader/loader";
import ReactSpinner from "@/components/loader/reactSpinner";
type OptionId = "Frontend" | "Backend" | "Sales" | "Others";
type setId="A" | "B" | "C" | "D";
export default function QuestionsPage() {
  const [selected, setSelected] = useState<OptionId|undefined >('Frontend');
    const [set, setSet] = useState<setId|undefined>('A');
    const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const [isOpen,setIsOpen]=useState<boolean>();
    useEffect(() => {
      console.log("backend",selected,set);
    if (selected && set) {
      setError(undefined);
      handleGet();
      setIsOpen(true);
    } else {
      setIsOpen(false); 
    }
  }, [selected, set]);
  const handleSet = (data:setId) => {
    setSet(data);
    handleGet();
  };
    const handleGet = () => {
    if (!selected) {
      setError("Please select an appropriate option");
      setIsOpen(false); 
    } else if (!set) {
      setError("Please select an appropriate Set");
      setIsOpen(false); 
    } else {
      setError(undefined); 
    }
  };
  const handleAdd=()=>{
    setIsAddOpen(true);
  }
  const closeModel = () => {
    setIsAddOpen(false);
  };
    return (
    <>
      <div>
        <StreamSelection error={error} selected={selected} setSelected={setSelected} handleGet={handleGet} setError={setError} />
      </div>
      <div className="mt-10 flex w-full items-center justify-between ">
        <div className="w-full">
          <QuestionSet handleSet={handleSet} />
        </div>
      </div>
      <div className="flex items-center justify-end mt-5">
              <Button
                isPending={false}
                text={"Add Question"}
                onClick={handleAdd}
                className={"px-5 py-2 mb-3 rounded-2xl bg-gradient-to-r from-[#ff3c57] to-[#ff7861] text-white whitespace-nowrap hover:from-[#ff5e7b] hover:to-[#ff9b7c] hover:shadow-lg hover:shadow-pink-400/50 transition-all duration-300"}
                children={undefined}
              />
            </div>
      <div className="h-70 overflow-auto  mb-10 ">
        {isOpen&&(
            <Suspense fallback={<ReactSpinner/>}>
              <ShowQuestion stream={selected} set={set}/>
            </Suspense>
        )}
        {isAddOpen&&(
          <div className="fixed inset-0 bg-black/30  flex items-center justify-center z-50">
            <AddQuestion stream={selected} set={set} onClose={closeModel}/>
          </div>
        )}
      </div>
    </>
  );
}
