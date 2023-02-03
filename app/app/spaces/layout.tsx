"use client";
import {ReactNode} from "react";
import Sidebar from "@/components/Sidebar";

const SpaceLayout = ({children}: { children: ReactNode }) => {
    return (
        <Sidebar>
            <>
                {children}
            </>
        </Sidebar>
    );
};
export default SpaceLayout;