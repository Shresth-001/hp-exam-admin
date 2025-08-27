interface checkboxProps{
    id?:string;
    name?:string;
    isChecked?:boolean;
    className?:string;
    type?:string;
    onChange:()=>void;
}
export default function CheckBox({className='form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer',id,isChecked,name,type="checkbox",onChange}:checkboxProps) {
    return (
        <>
        <input
        type={type}
        id={id}
        checked={isChecked}
        onChange={onChange}
        className={className}
      />
        </>
    )
}