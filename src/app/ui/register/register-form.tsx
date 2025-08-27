"use client";
import InputField from "@/components/inputFields/inputField";
import SubmitButton from "@/components/button/submitButton";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useRegister } from "@/hooks/registerHook/useRegister";

interface FormErrors {
  name?:string;
  email?: string;
  phone?:number;
  password?: string;
  message?: string;
}

export default function RegisterForm() {
const [error,setError]=useState<FormErrors>();
const adminRegister=useRegister();
  const router=useRouter();
  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[A-Za-z\s'-]+$/, "Name contains invalid characters.")
      .required("Name is required."),
    email: Yup.string()
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits.")
      .required("Phone is required."),
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
      name: "",
      email: "",
      phone: "",
      password:'',
    },
    validationSchema,
    onSubmit: (values) => {
      const formPayload = new FormData();
      formPayload.append("name", values.name);
      formPayload.append("email", values.email);
      formPayload.append("phone", values.phone);
      formPayload.append("password", values.password);
      adminRegister.mutate(formPayload, {
        onSuccess: (data) => {
          formik.resetForm();
          if(data.success){
            router.push('/admin/login')
          }else{
            setError((prev)=>{
              const updated={  ...prev,
                message:data.details.message
              }
              return updated;
              })
          }
        },
        onError:(error)=>{
          setError((prev)=>{
            const updated={
              ...prev,
              message:error.message
            }
            return updated;
          })
        }
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex-1 rounded-lg shadow-2xl shadow-black/30 bg-gray-50 pb-6 pt-8">
        <div className="w-full">
          {error?.message && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md  relative mb-10 mx-auto w-11/12" role="alert">
              <span className="block sm:inline">{error.message}</span>
            </div>
          )}
          <div className=" flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 px-5">
            <div className="relative flex-1 ">
              <InputField
                value={formik.values.name}
                onChange={formik.handleChange}
                required={true}
                className="peer  text-lg border-b-2 border-gray-300 bg-transparent leading-5 pt-4 px-3 pb-1 focus:outline-0 w-full "
                type="text"
                id="name"
                name="name"
                placeholder=""
                error={
                  (formik.touched.name && formik.errors.name) 
                }
              />
              <label className="label-floating" htmlFor="name">
                Admin Name
              </label>
            </div>
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
                  (formik.touched.email && formik.errors.email) 
                }
              />
              <label className="label-floating" htmlFor="email">
                Email
              </label>
            </div>
          </div>
          <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-5 px-5">
            <div className="relative flex-1">
              <InputField
                value={formik.values.phone}
                onChange={formik.handleChange}
                type="number"
                name="phone"
                className={
                  "peer border-b-2 border-gray-300 bg-transparent pt-4 px-3 pb-1  text-lg leading-5 focus:outline-0 w-full"
                }
                placeholder={""}
                error={
                  (formik.touched.phone && formik.errors.phone) 
                }
              />
              <label className="label-floating" htmlFor="phone">
                Phone
              </label>
            </div>
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
              isPending={adminRegister.isPending}
              text={"Sign Up"}
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
