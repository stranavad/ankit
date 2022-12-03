import {RoleName, Roles, RoleType} from "@/types/role";
import {useRef, useState} from "react";
import MenuSelect, {MenuSelectItem} from "@/components/MenuSelect";
import {FaEye, FaKey, FaPencilAlt} from "react-icons/fa";

interface RolePickerProps {
    role: RoleType;
    updateRole: (role: RoleType) => void;
    disabled: boolean;
}

const RolePicker = ({role, updateRole, disabled}: RolePickerProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const anchorRef = useRef<HTMLElement | null>(null);

    const handleClose = (role: RoleType) => {
        setOpen(false);
        updateRole(role);
    };

    const openRolePicker = () => {
        if (disabled) {
            return;
        }
        setOpen(true);
    };

    const items: MenuSelectItem[] = [
        {
            title: RoleName.VIEW,
            action: () => handleClose(RoleType.VIEW),
            icon: FaEye
        },
        {
            title: RoleName.EDIT,
            action: () => handleClose(RoleType.EDIT),
            icon: FaPencilAlt
        },
        {
            title: RoleName.ADMIN,
            action: () => handleClose(RoleType.ADMIN),
            icon: FaKey
        },
    ];

    return (
        <>
            <span ref={anchorRef} onClick={openRolePicker} style={{cursor: "pointer"}}>{Roles[role]}</span>
            <MenuSelect anchor={anchorRef.current} show={open} handleClose={() => setOpen(false)} items={items}/>
        </>
    );
};

export default RolePicker;