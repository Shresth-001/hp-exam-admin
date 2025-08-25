import { CgSpinner } from "react-icons/cg";

export default function ReactSpinner() {
  return (
    <div className="fixed inset-0 mb-10 flex flex-col items-center justify-center bg-white/30 z-50 rounded-lg">
      <CgSpinner
        size={40}
        aria-label="Loading..."
        className="animate-spin text-red-700"
      />
      <span className="mt-2 text-sm font-semibold text-red-500">
        Loading...
      </span>
    </div>
  );
}