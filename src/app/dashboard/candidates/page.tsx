import CandidatePage from "@/app/ui/candidates/candidatePage";
import ReactSpinner from "@/components/loader/reactSpinner";
import { Suspense } from "react";

export default function CandidatesPage() {
    return(
        <div>
            <h1 className="text-2xl flex items-center justify-center font-serif">All Candidates</h1>
            <Suspense fallback={<ReactSpinner/>}>
                <CandidatePage/>
            </Suspense>
        </div>
    )
}