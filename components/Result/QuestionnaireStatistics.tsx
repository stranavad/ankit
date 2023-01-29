import { QuestionnaireStatistics } from "@/types/result";
import { Line } from "react-chartjs-2";
import 'chart.js/auto';

interface QuestionnaireStatisticsProps {
    data: QuestionnaireStatistics;
}

const QuestionnaireStatistics = ({data}: QuestionnaireStatisticsProps) => {
    return (
        <div className="w-full bg-white p-5 rounded-md mb-10 max-h-[550px] h-full">
            <h3 className="font-medium text-lg">Statistics</h3>
            <Line data={data}/>
        </div>
    )
} 

export default QuestionnaireStatistics;