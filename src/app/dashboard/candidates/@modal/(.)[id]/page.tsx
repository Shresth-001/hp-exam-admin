import CandidateDetailsPage from "@/app/ui/candidates/candidateDetailsPage/candidateDetailsPage"
import { FC } from "react";
interface CandidatePageProps {
  params: {
    id: string;
  };
}

const CandidatePage: FC<CandidatePageProps> = ({ params }) => {
  const { id } = params; 

  return (
    <div>
      <CandidateDetailsPage user_id={id} />
    </div>
  );
};

export default CandidatePage;