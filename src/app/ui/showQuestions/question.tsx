import Button from "@/components/button/button";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Question {
  id: number;
  question_text: string;
  options?: string[];
  question_type: string;
  answer?:string;
}
interface QuestionProps{
    question:Question
    handleDelete:(id:number)=>void;
    handleEdit:(question:Question)=>void;
}
export default function Ques({handleDelete,question,handleEdit}:QuestionProps) {
  const [openQuestionId, setOpenQuestionId] = useState<number | null>(null);
    const toggleQuestion = (id: number) => {
    setOpenQuestionId((prev) => (prev === id ? null : id));
  };
    return (
    <div>
      <div key={question.id} className="border rounded-lg p-4">
        <div
          className="cursor-pointer font-semibold flex items-center justify-between"
          onClick={() => toggleQuestion(question.id)}
        >
          {question.question_text}
          <div>
            <Button
              isPending={false}
              text={""}
              className={""}
              onClick={()=>handleEdit(question)}
              children={<FaEdit size={25} className="text-gray-300 ml-2 " />}
            />
            <Button
              isPending={false}
              text={""}
              onClick={() => handleDelete(question.id)}
              className={""}
              children={<FaTrash size={25} className="text-gray-300 ml-2" />}
            />
          </div>
        </div>
        {openQuestionId === question.id && (
          <div className="mt-2 text-sm text-gray-700">
            <p>{question.question_text}</p>

            {question.options && (
              <ul className="mt-2 list-disc pl-5">
                {Object.entries(question.options).map(([key, opt]) => (
                  <p key={key}>
                    <strong>{key.toUpperCase()}:</strong> {opt}
                  </p>
                ))}
              </ul>
            )}
            <div className="mt-2 text-sm text-gray-700">
                <p> Answer: {question.answer}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
