import React, {MutableRefObject, ReactElement, useRef} from "react";
import {usePopper} from "react-popper";
import ClickAwayListener from "react-click-away-listener";

interface PopperProps {
    anchor: MutableRefObject<HTMLElement | null>["current"];
    children: ReactElement;
    show: boolean;
    handleClose: () => void;
}

const Popper = ({anchor, children, show, handleClose}: PopperProps) => {
    const popperRef = useRef(null);
    const {styles, attributes} = usePopper(anchor, popperRef.current, {
        placement: "bottom-start",
    });

    return (
        <div style={{display: show ? "block" : "none"}}>
            <ClickAwayListener onClickAway={handleClose}>
                <div ref={popperRef} style={styles.popper} {...attributes.popper} >
                    {children}
                </div>
            </ClickAwayListener>
        </div>
    );
};

export default Popper;