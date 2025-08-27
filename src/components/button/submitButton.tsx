import clsx from "clsx";
import ReactSpinner from "../loader/loader";

interface buttonType{
    isPending:boolean;
    text:string;
    type?:'button'|'submit'|'reset';
    className:string;
    children:React.ReactNode;
    handleSubmit?:()=>void
}

export default function SubmitButton({handleSubmit,children,isPending,text='submit',type='button',className}:buttonType) {
    return(
        <>
        <button className={className} onClick={handleSubmit}
       type={type} disabled={isPending} >{isPending?'':text}{isPending?<ReactSpinner size={15} showText={false} divClassName=" "/>:children}</button>
        </>
    )
}