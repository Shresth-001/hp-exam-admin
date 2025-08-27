
'use client'
import { useState } from "react";
import { useResumePreview } from "@/hooks/resumeHooks/useResume";  
import { useRouter } from "next/navigation";
import CandidateDetailsPage from "../candidateDetailsPage/candidateDetailsPage";
import CandidateDetailsModal from "../candidateModel/candidateModel";
import Button from "@/components/button/button";
import { FaTrash } from "react-icons/fa";
import { useCandidate } from "@/hooks/candidateHooks/useCandidate";
import toast from "react-hot-toast";

interface candidateType {
  email: string;
  exam_status: string;
  job_role_name: string;
  name: string;
  obtained_marks: string;
  paper_set_name: string;
  phone: string;
  resume_url: string;
  total_marks: string;
  user_id: string;
  experience:string;
}
interface candidateProps{
    candidates:candidateType[];
}
interface props {
  user_id: string;
}
interface userId{
    user_id:props
}

export default function CandidateTable({ candidates }: candidateProps) {
  const router=useRouter();
  const { previewUrl, handlePreviewClick, isLoading, closePreview } = useResumePreview();
  const{deleteUserMutation}=useCandidate({});
  const [isOpenModal,setIsOpenModal]=useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<string|null>(null); 
  const closeModal=()=>{
    setIsOpenModal(false);
  }
  const handleDelete=(e: React.MouseEvent, user_id: string) => {
    e.stopPropagation();
    deleteUserMutation.mutate(user_id,{
      onSuccess:()=>{
        toast.success("Candidate Deleted SucessFully")
      }
    })
  }

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <table className="w-full text-left border-collapse table-auto">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 font-semibold text-sm uppercase tracking-wider">Name</th>
              <th className="py-3 px-4 font-semibold text-sm uppercase tracking-wider">Email</th>
              <th className="py-3 px-4 font-semibold text-sm uppercase tracking-wider">Job Role</th>
              <th className="py-3 px-4 font-semibold text-sm uppercase tracking-wider">Experience</th>
              <th className="py-3 px-4 font-semibold text-sm uppercase tracking-wider">Exam Status</th>
              <th className="py-3 px-4 font-semibold text-sm uppercase tracking-wider">Marks</th>
              <th className="py-3 px-4 font-semibold text-sm uppercase tracking-wider">Resume</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {candidates.map((user) => (
              <tr key={user.user_id} className="hover:bg-gray-50 transition-colors" onClick={()=>{
                setSelectedUserId(user.user_id);
                setIsOpenModal(true);}
              } >
                <td className="py-3 px-4 whitespace-nowrap">{user.name}</td>
                <td className="py-3 px-4 whitespace-nowrap">{user.email}</td>
                <td className="py-3 px-4 whitespace-nowrap">{user.job_role_name}</td>
                <td className="py-3 px-4 whitespace-nowrap">{user.experience}</td>
                <td className="py-3 px-4 whitespace-nowrap">{user.exam_status}</td>
                <td className="py-3 px-4 whitespace-nowrap">{`${user.obtained_marks}/${user.total_marks}`}</td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <Button
                    onClick={(e) =>{ 
                      e.stopPropagation();
                      handlePreviewClick(user.resume_url)}}
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors" isPending={isLoading} text={"Preview"}/>                  
                </td>
                <td>
                  <Button onClick={(e:any)=>handleDelete(e,user.user_id)} isPending={false} text={""} className={""} children={<FaTrash size={20} className="text-red-400 mr-2"/>}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isOpenModal&&(
        <div className="h-screen overflow-auto  ">
          <CandidateDetailsModal user_id={selectedUserId} onClose={closeModal}/>
        </div>
      )}

      
      {previewUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-1/2 relative">
            <div className="flex justify-end p-2">
              <button onClick={closePreview} className="text-gray-500 hover:text-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <iframe
              src={previewUrl}
              className="w-full h-[calc(100%-48px)] rounded-b-lg"
              title="Resume Preview"
            />
          </div>
        </div>
      )}
    </div>
  );
}