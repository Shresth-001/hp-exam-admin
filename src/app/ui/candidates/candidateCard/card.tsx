interface candidateType {
  email: string;
  exam_status: string;
  job_role_name: string;
  name: string;
  obtained_marks: string;
  paper_set_name: string;
  phone: string;
  resume_url: File;
  total_marks: string;
  user_id: string;
}
interface cardProps {
  candidate: candidateType;
}
export default function Card({ candidate }: cardProps) {
  return (
    <div className="w-full max-w-50 mx-auto p-2 bg-white rounded-3xl shadow-lg text-center flex flex-col items-center">
  
  <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-yellow-400 p-1 flex items-center justify-center -mt-10">
        <img
          src="\blank-profile-picture-973460_1920.png"
          alt={`${candidate.name}`}
          className="object-cover w-full h-full rounded-full"
        />
      </div>
      <h2 className="mt-4 text-xl font-semibold text-gray-800">
        {candidate.name}
      </h2>
      <p className="text-sm font-medium text-gray-500">
        {candidate.job_role_name}
      </p>
      <p className="mt-4 text-sm text-gray-600 px-6">Hello world</p>

      <a
        href={`mailto:${candidate.email}`}
        className="mt-6 px-6 py-3 w-40  rounded-full text-xs font-medium bg-gradient-to-r from-[#ff3c57] to-[#ff7861] text-white whitespace-nowrap
                         hover:from-[#ff5e7b] hover:to-[#ff9b7c] hover:shadow-lg hover:shadow-pink-400/50 transition-all duration-300"
      >{candidate.email}</a>
    </div>
  );
}
