import clsx from "clsx";
import ReactSpinner from "../loader/loader";

interface buttonType{
    isPending:boolean;
    text:string;
    type?:'button'|'submit'|'reset';
    className:string;
    children?:React.ReactNode;
    pendingtext?:string;
    onClick?:(event:any)=>void
    hidden?:boolean;
    name?:string;
    disable?:boolean
    divClassName?:string;
    showText?:boolean
    spinnerClassName?:string;
}

export default function Button({showText=false,disable=false,name,hidden,onClick,pendingtext,children,isPending,text='submit',type='button',className,divClassName='',spinnerClassName="animate-spin text-blue-500"}:buttonType) {
    return(
        <>
        <button title={name} name={name}  className={className} hidden={hidden} onClick={onClick} 
       type={type} disabled={disable} >{isPending?pendingtext:text}{isPending?<ReactSpinner size={15} divClassName={divClassName} showText={showText} spinnerClassName={spinnerClassName}/>:children}</button>
        </>
    )
}