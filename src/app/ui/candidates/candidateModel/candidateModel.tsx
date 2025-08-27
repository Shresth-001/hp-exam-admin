
'use client';
import { FC } from 'react';
import { X } from 'lucide-react';
import { useCandidate } from "@/hooks/candidateHooks/useCandidate";
import CandidateDetails from "../candidateDetails/candidateDetails";
import ReactSpinner from "@/components/loader/reactSpinner";
import { AlertTriangle } from "lucide-react";

interface CandidateDetailsModalProps {
  user_id: string|null;
  onClose: () => void;
}

const CandidateDetailsModal: FC<CandidateDetailsModalProps> = ({ user_id, onClose }) => {
  const { userData, isLoading, isError, error } = useCandidate({ user_id });
  console.log(user_id,"   ",userData);
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="flex flex-col items-center p-6 rounded-lg bg-white dark:bg-gray-800 shadow-xl">
          <ReactSpinner/>
          <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">Loading user data...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="flex flex-col items-center p-6 rounded-lg bg-red-50 dark:bg-red-900/50 shadow-xl border border-red-300 dark:border-red-700">
          <AlertTriangle className="text-red-500" size={48} />
          <p className="mt-4 text-red-700 dark:text-red-300 font-medium">
            Error fetching data: {error?.message || "An unknown error occurred."}
          </p>
          <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-200 rounded">Close</button>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="flex flex-col items-center p-6 rounded-lg bg-white dark:bg-gray-800 shadow-xl">
          <p className="text-gray-600 dark:text-gray-400 font-medium">No user data available.</p>
          <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-200 rounded">Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0  bg-opacity-60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] relative p-6 flex flex-col overflow-hidden">
        
        
        <div className="flex justify-end mb-4">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={24} />
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto">
          <CandidateDetails onClose={onClose} userData={userData}/>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetailsModal;