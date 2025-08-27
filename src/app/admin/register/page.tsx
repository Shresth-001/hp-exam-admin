import { Suspense } from "react";
import Logo from "@/components/svg/logo";
import Link from "next/link";
import RegisterForm from "@/app/ui/register/register-form";

export default function RegisterPage() {
    return(
        <div>
            <main className="flex items-center justify-center  md:h-screen">
            <div className="relative mx-auto flex w-full max-w-lg  pt-5  flex-col space-y-2.5 p-4 md:-mt-32">
                <div className="flex h-20 w-full items-end justify-center rounded-lgp-3 md:h-36">
                        <Logo/>
                </div>
                <Suspense>
                    <RegisterForm/>
                </Suspense>
                <div className="flex items-center justify-center">
                    <Link href={"/admin/login"} className="">Already have an account? <span className="text-[#ff3c57] font-light  hover:font-medium">Log in</span></Link>
                </div>
            </div>

        </main>
        </div>
    )
}