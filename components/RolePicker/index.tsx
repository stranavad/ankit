import {RoleName, Roles, RoleType} from "@/types/role";
import {useRef, useState} from "react";
import Popper from "@/components/base/Popper";
import Button from "@/components/base/Button";

interface RolePickerProps {
    role: RoleType;
    updateRole: (role: RoleType) => void;
}

const RolePicker = ({role, updateRole}: RolePickerProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const anchorRef = useRef<HTMLElement | null>(null);

    const handleClose = (role: RoleType) => {
        setOpen(false);
        updateRole(role);
    };

    return (
        <>
            <span ref={anchorRef} onClick={() => setOpen(true)} style={{cursor: "pointer"}}>{Roles[role]}</span>
            <Popper open={open} handleClose={() => setOpen(false)} anchor={anchorRef.current}>
                <div className="popper-container flex flex-col">
                    <Button onClick={() => handleClose(RoleType.VIEW)}
                        variant="text">{RoleName.VIEW.toString()}</Button>
                    <Button onClick={() => handleClose(RoleType.EDIT)}
                        variant="text">{RoleName.EDIT.toString()}</Button>
                    <Button onClick={() => handleClose(RoleType.ADMIN)}
                        variant="text">{RoleName.ADMIN.toString()}</Button>
                </div>
            </Popper>
        </>
    );
};

export default RolePicker;