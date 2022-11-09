import {RoleName, Roles, RoleType} from "@/types/role";
import {useRef, useState} from "react";
import Popper from "@/components/base/Popper";

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

    return (
        <>
            <span ref={anchorRef} onClick={openRolePicker} style={{cursor: "pointer"}}>{Roles[role]}</span>
            <Popper open={open} handleClose={() => setOpen(false)} anchor={anchorRef.current}>
                <div className="popper-container">
                    <button onClick={() => handleClose(RoleType.VIEW)}
                            className="text">{RoleName.VIEW.toString()}</button>
                    <button onClick={() => handleClose(RoleType.EDIT)}
                            className="text">{RoleName.EDIT.toString()}</button>
                    <button onClick={() => handleClose(RoleType.ADMIN)}
                            className="text">{RoleName.ADMIN.toString()}</button>
                </div>
            </Popper>
        </>
    );
};

export default RolePicker;