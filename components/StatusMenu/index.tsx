import Switch from "@/components/base/Switch";
import {Status} from "@/types/questionnaire";

interface StatusMenuProps {
    status: Status;
    update: (status: Status) => void;
}

const StatusMenu = ({status, update}: StatusMenuProps) => {
    return <Switch title="Active" value={status === Status.ACTIVE}
                   update={bool => update(bool ? Status.ACTIVE : Status.PAUSED)}/>;
};

export default StatusMenu;