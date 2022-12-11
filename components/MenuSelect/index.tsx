import {MutableRefObject} from "react";
import Popper from "@/components/base/Popper";
import classNames from "classnames";
import styles from "./index.module.scss";
import {IconType} from "react-icons";

interface MenuSelectProps {
    anchor: MutableRefObject<HTMLElement | null>["current"];
    show: boolean;
    handleClose: () => void;
    items: MenuSelectItem[];
}

export interface MenuSelectItem {
    title: string;
    icon?: IconType;
    action: () => void;
}

const MenuSelect = ({anchor, show, handleClose, items}: MenuSelectProps) => {
    return (
        <Popper show={show} handleClose={handleClose} anchor={anchor}>
            <div className={classNames("popper-container", styles.menuContainer)}>
                {items.map((item, index) => (
                    <button key={index} className="text small" onClick={item.action}>{item.icon &&
						<item.icon/>}{item.title}</button>
                ))}
            </div>
        </Popper>
    );
};

export default MenuSelect;