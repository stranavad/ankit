import {QuestionType} from "@/types/questionnaire";
import {Result} from "@/types/result";
import BarChartSelect from "./Charts/Select/Bar";
import {TrashIcon} from "@heroicons/react/24/outline";
import IconButton from "../Button/IconButton";
import PageCard from "@/components/Utils/PageCard";

interface QuestionResultProps {
    result: Result;
    removeAnswer: (questionId: number, answerId: number) => void;
}

const QuestionResult = ({result, removeAnswer}: QuestionResultProps) => {
    if (result.question.type === QuestionType.TEXT && result.data) {
        return (
            <PageCard className="mb-10">
                <h3 className="font-medium text-lg">{result.question.title}</h3>
                <div className="flex flex-col max-h-96 overflow-y-scroll">
                    {result.data.map((data) => (
                        <div key={data.id} className="bg-slate-100 p-1 px-2 my-1 text-sm flex justify-between">
                            <span>{data.value}</span>
                            <IconButton icon={TrashIcon} color="error"
                                        onClick={() => removeAnswer(result.question.id, data.id)}/>
                        </div>
                    ))}
                </div>
            </PageCard>
        );
    }

    if (result.chart) {
        return (
            <BarChartSelect result={result}/>
        );
    }

    return (
        <h2>Can't display this answer</h2>
    );
};

export default QuestionResult;