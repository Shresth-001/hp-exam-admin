import React from "react";
import SideNav from "../ui/dashboard/sidenav";


export default function Layout({children,modal}:{children: React.ReactNode,modal:React.ReactNode}){
    return(
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                <SideNav/>
            </div>
            {/* md:overflow-y-auto */}
            <div className="flex-grow p-6  md:p-12">
                <h1 className="text-3xl text-black font-serif mb-2">Dashboard</h1>
                {modal}
                {children}
                </div>
        </div>
    )
}