"use client";
import {ReactNode} from "react";
import CurrentSpaceProvider from "@/components/Modals/CurrentSpaceProvider";

const CurrentSpaceLayout = ({
    children,
    params
}: { children: ReactNode, params: { id: number } }) => {
    return (
        <CurrentSpaceProvider spaceId={params.id}>
            <>
                {children}
            </>
        </CurrentSpaceProvider>
    );
};

export default CurrentSpaceLayout;