import {Bar, Pie} from "react-chartjs-2";
import {ChartBarIcon, ChartPieIcon} from "@heroicons/react/24/solid";
import "chart.js/auto";
import {useState} from "react";
import {Result} from "@/types/result";
import PageCard from "@/components/Utils/PageCard";


enum ChartType {
    BAR,
    PIE
}

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
};

const BarChartSelect = ({result: {chart, question}}: { result: Result }) => {
    const [chartType, setChartType] = useState<ChartType>(ChartType.BAR);

    if (!chart) {
        return null;
    }

    return (
        <PageCard className="mb-10 max-h-[550px] h-full">
            <div className="w-full flex justify-between">
                <h3 className="font-medium text-lg">{question.title}</h3>
                <div>
                    <button onClick={() => setChartType(ChartType.BAR)}
                            className={`p-1 border rounded-l-md border-slate-600 hover:bg-slate-200 ${chartType === ChartType.BAR ? "text-slate-900" : "text-slate-400"}`}>
                        <ChartBarIcon className="h-4 w-4"/></button>
                    <button onClick={() => setChartType(ChartType.PIE)}
                            className={` p-1 border border-l-0 rounded-r-md border-slate-600 hover:bg-slate-200 ${chartType === ChartType.PIE ? "text-slate-900" : "text-slate-400"}`}>
                        <ChartPieIcon className="h-4 w-4 "/></button>
                </div>
            </div>
            <div className="max-h-[400px] h-[400px]">
                {chartType === ChartType.BAR ? (
                    <Bar options={chartOptions} data={chart}/>
                ) : (
                    <Pie options={chartOptions} data={chart}/>
                )}
            </div>
        </PageCard>
    );
};

export default BarChartSelect;