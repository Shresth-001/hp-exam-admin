"use client";
import React from "react";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  FileText,
  Award,
  CheckCircle,
  XCircle,
  Hash,
  Percent,
  Trash2,
  GraduationCap,
} from "lucide-react";
import { useCandidate } from "@/hooks/candidateHooks/useCandidate";
import toast from "react-hot-toast";

interface props {
  userData: UserData;
  onClose: () => void;
}
interface UserData {
  user: {
    user_id: string;
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
    question_type: "objective" | "subjective";
    correct_answer: string | null;
    selected_option?: string;
    written_answer?: string;
    is_correct: boolean | null;
  }[];
}
export default function CandidateDetails({ userData,onClose }: props) {
  const { user, responses } = userData;
  const { deleteUserMutation } = useCandidate({});

  const handleDelete=(user_id:string)=>{
    deleteUserMutation.mutate(user_id,{
      onSuccess:(data)=>{
        if(data.success){
          toast.success("Candidate deleted Successfully")
          onClose()
        }
        if(!data.success){
          toast.error("Candidate is not deleted")
          return;
        }
      }
    })
  }
  const DetailItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    value: React.ReactNode;
  }> = ({ icon, label, value }) => (
    <div className="flex items-center space-x-2">
      <div className="text-blue-500">{icon}</div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-500">{label}</span>

        <div className="text-lg font-semibold text-gray-800">{value}</div>
      </div>
    </div>
  );
  const attemptedQuestions = parseInt(user.attempted_questions, 10);
  const correctAnswers = parseInt(user.correct_answers, 10);
  const totalQuestions = parseInt(user.total_questions, 10);
  const percentageScore =
    totalQuestions > 0
      ? ((correctAnswers / totalQuestions) * 100).toFixed(0)
      : 0;

  return (
    <div className="bg-gray-100 font-sans p-4">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full mx-auto my-0 border border-gray-200">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-extrabold text-gray-900">
              User Details
            </h1>
            <button onClick={()=>handleDelete(user.user_id)} className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-colors">
              <Trash2 size={18} />
              <span>Delete User</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 p-6 bg-gray-50 rounded-xl">
            <DetailItem
              icon={<User size={20} />}
              label="Name"
              value={user.name}
            />
            <DetailItem
              icon={<Mail size={20} />}
              label="Email"
              value={<span className="break-all">{user.email}</span>}
            />
            <DetailItem
              icon={<Phone size={20} />}
              label="Phone"
              value={user.phone}
            />
            <DetailItem
              icon={<GraduationCap size={20} />}
              label="Job Role"
              value={user.job_role_name}
            />
            <DetailItem
              icon={<Briefcase size={20} />}
              label="Experience"
              value={`${user.experience} years`}
            />
            <DetailItem
              icon={<FileText size={20} />}
              label="Resume"
              value={
                <a
                  href={user.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View Resume
                </a>
              }
            />
          </div>

          <div className="p-6 mb-8 bg-white rounded-xl border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Exam Attempt Summary
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-blue-50 rounded-lg">
                <Hash size={24} className="text-blue-600 mx-auto mb-2" />
                <div className="text-gray-500 text-sm">Attempted</div>
                <div className="text-xl font-bold text-gray-900">
                  {attemptedQuestions}/{totalQuestions}
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <CheckCircle
                  size={24}
                  className="text-green-600 mx-auto mb-2"
                />
                <div className="text-gray-500 text-sm">Correct</div>
                <div className="text-xl font-bold text-gray-900">
                  {correctAnswers}
                </div>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <XCircle size={24} className="text-red-600 mx-auto mb-2" />
                <div className="text-gray-500 text-sm">Wrong</div>
                <div className="text-xl font-bold text-gray-900">
                  {user.wrong_answers}
                </div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <Award size={24} className="text-purple-600 mx-auto mb-2" />
                <div className="text-gray-500 text-sm">Score</div>
                <div className="text-xl font-bold text-gray-900">
                  {user.obtained_marks}/{user.total_marks}
                </div>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg col-span-1 sm:col-span-2 lg:col-span-4">
                <Percent size={24} className="text-yellow-600 mx-auto mb-2" />
                <div className="text-gray-500 text-sm">Percentage Score</div>
                <div className="text-xl font-bold text-gray-900">
                  {percentageScore}%
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Responses</h2>
            <div className="space-y-6">
              {responses.map((response, index) => (
                <div
                  key={index}
                  className="p-6 border border-gray-200 rounded-xl bg-gray-50"
                >
                  <div className="flex items-center mb-4">
                    <span className="font-bold text-gray-900 mr-2">
                      Question {index + 1}:
                    </span>
                    <p className="text-gray-700 font-medium">
                      {response.question_text}
                    </p>
                  </div>

                  {response.question_type === "objective" ? (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-600">
                          Your Answer:
                        </span>
                        <span
                          className={`font-bold ${
                            response.is_correct
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {response.selected_option}
                        </span>
                        {response.is_correct ? (
                          <CheckCircle className="text-green-600" size={16} />
                        ) : (
                          <XCircle className="text-red-600" size={16} />
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-600">
                          Correct Answer:
                        </span>
                        <span className="font-bold text-green-600">
                          {response.correct_answer}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-600">
                          Your Written Answer:
                        </span>
                        <div className="bg-white p-4 rounded-lg border border-gray-200 mt-2 w-full">
                          <p className="text-gray-800 whitespace-pre-line">
                            {response.written_answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
