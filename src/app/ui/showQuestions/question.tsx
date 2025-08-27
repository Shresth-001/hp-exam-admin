import { updateSelectedQuestion } from "@/app/api/questionApi/question";
import Button from "@/components/button/button";
import CheckBox from "@/components/inputFields/checkBox";
import InputField from "@/components/inputFields/inputField";
import { useQuestion } from "@/hooks/questionHooks/useQuestion";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Question {
  id: number;
  is_selected: boolean;
  question_text: string;
  options?: string[];
  question_type: string;
  answer?: string;
}
interface QuestionProps {
  question: Question;
  handleDelete: (id: number) => void;
  handleEdit: (question: Question) => void;
}
export default function Ques({
  handleDelete,
  question,
  handleEdit,
}: QuestionProps) {
  const [openQuestionId, setOpenQuestionId] = useState<number | null>(null);
  const{updateSelectQuestion}=useQuestion({});
  const [isChecked, setIsChecked] = useState(question.is_selected);
  const handleSelectedChange = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    handleSelected();
  };
  const handleSelected = () => {
    const id=question.id;
    const is_selected=isChecked
    updateSelectQuestion.mutate({id,is_selected},{
      onSuccess:(data)=>{
        if(!data.success){
          toast.error("Question Selection is not updated")
        }
      }
    });
  };
  const toggleQuestion = (id: number) => {
    setOpenQuestionId((prev) => (prev === id ? null : id));
  };
  return (
    <>
      <div key={question.id} className="border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <CheckBox
              isChecked={isChecked}
              id={`question-${question.id}`}
              name={`question-${question.id}`}
              onChange={handleSelectedChange}
            />
            <div
              className="cursor-pointer font-semibold ml-3"
              onClick={() => toggleQuestion(question.id)}
            >
              {question.question_text}
            </div>
          </div>
          <div className="flex items-center">
            <Button
              isPending={false}
              text={""}
              className={"cursor-pointer"}
              onClick={() => handleEdit(question)}
              children={<FaEdit size={25} className="text-blue-300  ml-2 " />}
            />
            <Button
              isPending={false}
              text={""}
              onClick={() => handleDelete(question.id)}
              className={"cursor-pointer"}
              children={<FaTrash size={25} className="text-red-500 ml-2" />}
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
    </>
  );
}
