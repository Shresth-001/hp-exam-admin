import QuestionsPage from "@/app/ui/question/questionPage";
import StreamSelection from "@/app/ui/selection/streamSelection";
import Loader from "@/components/loader/loader";
import ReactSpinner from "@/components/loader/reactSpinner";
import { Suspense } from "react";

export default function QuestionPage() {
    return (
        <div>
            <Suspense fallback={<ReactSpinner/>}>
                <QuestionsPage/>
            </Suspense>
        </div>
    )
}