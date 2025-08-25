'use client'
import { Suspense } from "react";
import ShowCandidates from "./showCandidates/showCandidates";

export default function CandidatePage() {
    return(
        <div className="h-150  overflow-auto   mb-10">
            <Suspense>
                <ShowCandidates/>
            </Suspense>
        </div>
    )
}