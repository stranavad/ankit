import {PopperUnstyled, ClickAwayListener} from "@mui/base";
import {ReactElement, MutableRefObject} from "react";

interface PopperProps {
    open: boolean;
    handleClose: () => void;
    children: ReactElement;
    anchor: MutableRefObject<HTMLElement | null>["current"];
}

export const Popper = ({open, handleClose, children, anchor}: PopperProps) => {
    return (
        <PopperUnstyled open={open} placement="bottom-start" anchorEl={anchor}>
            <ClickAwayListener onClickAway={handleClose}>
                {children}
            </ClickAwayListener>
        </PopperUnstyled>
    );
};

export default Popper;
