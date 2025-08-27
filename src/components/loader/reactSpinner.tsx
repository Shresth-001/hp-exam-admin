import { CgSpinner } from "react-icons/cg";
import { twMerge } from "tailwind-merge";
interface props{
  size?:number;
  divClassName?:string;
  spanClassName?:string; 
  showText?:boolean 
  spinnerClassName?:string;
}
export default function ReactSpinner({divClassName="fixed inset-0 mb-10 flex flex-col items-center justify-center bg-white/30 z-50 rounded-lg",showText=true,size=40,spanClassName,spinnerClassName="animate-spin text-red-700"}:props) {
  return (
    <div className={divClassName}>
      <CgSpinner
        size={size}
        aria-label="Loading..."
        className={spinnerClassName}
      />
      {showText&&(
        <span className={twMerge("mt-2 text-sm font-semibold ",spanClassName?spanClassName:"text-red-500")}>
        Loading...
      </span>
      )}
    </div>
  );
}