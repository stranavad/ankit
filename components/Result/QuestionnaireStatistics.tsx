import {QuestionnaireStatistics} from "@/types/result";
import {Line} from "react-chartjs-2";
import "chart.js/auto";
import PageCard from "@/components/Utils/PageCard";

interface QuestionnaireStatisticsProps {
    data: QuestionnaireStatistics;
}

const QuestionnaireStatistics = ({data}: QuestionnaireStatisticsProps) => {
    return (
        <PageCard className="mb-10 max-h-[550px] h-full mt-5">
            <h3 className="font-medium text-lg">Statistics</h3>
            <Line data={data}/>
        </PageCard>
    );
};

export default QuestionnaireStatistics;