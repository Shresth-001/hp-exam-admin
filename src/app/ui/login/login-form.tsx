"use client";
import InputField from "@/components/inputFields/inputField";
import SubmitButton from "@/components/button/submitButton";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useEffect, useState } from "react";
// import { useLogin } from "@/hooks/loginHooks/useLogin";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/loginHook/useLogin";

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  experience?: string;
  api?: string;
}

export default function LoginForm() {
  const [file, setFile] = useState<File | null>(null);
  const [fileReset, setFileReset] = useState<boolean>(false);
  const adminLogin=useLogin();
  const router=useRouter();
  useEffect(()=>{
    // if(reDirectToDashBoard){
    //   router.push('/user/dashboard/stream-selection')
    // }
  })
  const validationSchema = Yup.object({
    email: Yup.string()
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format")
      .required("Email is required"),
    password:Yup.string()
    .min(8, 'Password must be 8 characters long')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .matches(/[^\w]/, 'Password requires a symbol')
    .required("Password is required."),  
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password:'',
    },
    validationSchema,
    onSubmit: (values) => {
      const formPayload = new FormData();
      formPayload.append("email", values.email);
      formPayload.append("password", values.password);
      adminLogin.mutate(formPayload, {
        onSuccess: () => {
          formik.resetForm();
          router.push('/dashboard')
        },
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex-1 rounded-lg shadow-2xl shadow-black/30 bg-gray-50 pb-6 pt-8">
        <div className="w-full">
          {/* {errorsList.message && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md  relative mb-10 mx-auto w-11/12" role="alert">
              <span className="block sm:inline">{errorsList.message}</span>
            </div>
          )} */}
          <div className=" flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 px-5">
            <div className="relative flex-1">
              <InputField
                value={formik.values.email}
                onChange={formik.handleChange}
                type="email"
                name="email"
                className={
                  "peer  border-b-2 mr-10 border-gray-300 bg-transparent pt-4 px-3 pb-1  text-lg leading-5 focus:outline-0 w-full"
                }
                placeholder={""}
                error={
                  (formik.touched.email && formik.errors.email) }
              />
              <label className="label-floating" htmlFor="email">
                Email
              </label>
            </div>
          </div>
          <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-5 px-5">
            <div className="relative flex-1">
              <InputField
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                name={"password"}
                className={
                  "peer border-b-2 border-gray-300   bg-transparent pt-4 px-3 pb-1  text-lg leading-5 focus:outline-0 w-full"
                }
                placeholder={""}
                error={
                  (formik.touched.password && formik.errors.password) 
                }
              />
              <label className="label-floating" htmlFor="experience">
                Password
              </label>
            </div>
          </div>
          <div className="relative flex items-center justify-center mt-4">
            <SubmitButton
              type="submit"
              isPending={adminLogin.isPending}
              text={"Log In"}
              className="group w-85 rounded-3xl px-10 py-2 font-semibold flex items-center justify-center bg-gradient-to-r from-[#ff3c57] to-[#ff7861] text-white whitespace-nowrap
                         hover:from-[#ff5e7b] hover:to-[#ff9b7c] hover:shadow-lg hover:shadow-pink-400/50 transition-all duration-300"
              children={
                <FaArrowAltCircleRight className="h-6 w-6 text-gray-50 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
              }
            />
          </div>
        </div>
      </div>
    </form>
  );
}
