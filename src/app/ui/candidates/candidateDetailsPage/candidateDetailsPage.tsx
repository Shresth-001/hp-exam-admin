'use client'
import { useCandidate } from "@/hooks/candidateHooks/useCandidate";
import CandidateDetails from "../candidateDetails/candidateDetails";
import ReactSpinner from "@/components/loader/reactSpinner";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";

interface UserData {
  user: {
    user_id: number;
    name: string;
    email: string;
    phone: string;
    experience: string;
    resume_url: string;
    role: string;
    created_at: string;
    updated_at: string;
    job_role_name: string;
    paper_set_name: string;
    attempt_id: number;
    total_questions: string;
    attempted_questions: string;
    correct_answers: string;
    wrong_answers: string;
    total_marks: string;
    obtained_marks: string;
    started_at: string;
  };
  responses: {
    question_id: number;
    question_text: string;
    question_type: 'objective' | 'subjective';
    correct_answer: string | null;
    selected_option?: string;
    written_answer?: string;
    is_correct: boolean | null;
  }[];
}
interface props {
  user_id: string;
}
export default function CandidateDetailsPage({user_id}:props) {
      const{userData,deleteUserMutation,error,isError,isLoading}=useCandidate({user_id});
      const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 font-sans">
        <div className="flex flex-col items-center p-6 rounded-lg bg-white dark:bg-gray-800 shadow-xl">
          <ReactSpinner/>
          <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">Loading user data...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 font-sans">
        <div className="flex flex-col items-center p-6 rounded-lg bg-red-50 dark:bg-red-900/50 shadow-xl border border-red-300 dark:border-red-700">
          <AlertTriangle className="text-red-500" size={48} />
          <p className="mt-4 text-red-700 dark:text-red-300 font-medium">
            Error fetching data: {error?.message || "An unknown error occurred."}
          </p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 font-sans">
        <p className="text-gray-600 dark:text-gray-400 font-medium">No user data available.</p>
      </div>
    );
  }

  


    return( 
        <div >
            <CandidateDetails userData={userData}/>
        </div>

    )
}