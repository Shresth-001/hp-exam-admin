"use client";
import ReactSpinner from "@/components/loader/reactSpinner";
import { useCandidate } from "@/hooks/candidateHooks/useCandidates";
import Card from "../candidateCard/card";
import CandidateTable from "../candidateTable/candidateTable";

interface candidateType {
  email: string;
  exam_status: string;
  job_role_name: string;
  name: string;
  obtained_marks: string;
  paper_set_name: string;
  phone: string;
  resume_url:File;
  total_marks: string;
  user_id: string;
}

export default function ShowCandidates() {
  const { candidates, isLoading, isError, error } = useCandidate();
  if (isLoading)
    return (
      <div>
        <ReactSpinner />
      </div>
    );
  if (error)
    return (
      <p className="font-bold text-2xl">
        Something went wrong Didn't find Candidates
      </p>
    );
  return (
    <div className="flex flex-row flex-wrap gap-10 mt-20 mb-5 justify-center  ">
      {candidates?.success && (
        <>
          {/* {candidates.data.map((candidate: candidateType) => (
                <Card key={candidate.user_id} candidate={candidate}/>
          ))} */}
          <CandidateTable candidates={candidates.data}/>
        </>
      )}
    </div>
  );
}
