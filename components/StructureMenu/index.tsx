import Switch from "@/components/base/Switch";
import {Structure} from "@/types/questionnaire";

interface StructureMenuProps {
    structure: Structure;
    update: (status: Structure) => void;
}

const StructureMenu = ({structure, update}: StructureMenuProps) => {
    return <Switch title="Individual questions" value={structure === Structure.INDIVIDUAL}
                   update={bool => update(bool ? Structure.INDIVIDUAL : Structure.LIST)}/>;
};

export default StructureMenu;