"use client";
import { useEffect } from "react";
import { Design } from "@/types/design";
import { DesignContext } from "@/util/context/design";

interface DesignLayoutProps {
    children: any;
    design: Design;
}

const DesignLayout = ({ children, design }: DesignLayoutProps) => {

    useEffect(() => {
        document.body.style = `background: ${design.backgroundColor}`;
    }, []);

    return (
        <DesignContext.Provider value={design}>
            <div
                className="min-h-screen flex flex-col justify-top items-center pt-24 max-w-[100vw] overflow-x-hidden relative">
                <div>
                    {children}
                </div>
            </div>
        </DesignContext.Provider>
    )
        ;
};

export default DesignLayout;