import { Status } from "@/types/questionnaire";

const StatusIndicator = ({status}: {status: Status}) => {

    const getColor = (status: Status) => `status-${status}`;

    return (
        <div className={`h-3 w-3 rounded-full ${getColor(status)}`}/>
    )
}

export default StatusIndicator;