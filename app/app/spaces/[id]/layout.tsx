"use client";
import {ReactNode} from "react";
import CurrentSpaceProvider from "@/components/CurrentSpaceProvider";
import Tabs from "@/components/Navigation/Tabs";

const routes = [
    {
        name: "Dashboard",
        path: ""
    },
    {
        name: "Questionnaires",
        path: "questionnaires"
    }
];


const CurrentSpaceLayout = ({
    children,
    params
}: { children: ReactNode, params: { id: number } }) => {

    return (
        <CurrentSpaceProvider spaceId={params.id}>
            <>
                <Tabs routes={routes}/>
                {children}
            </>
        </CurrentSpaceProvider>
    );
};

export default CurrentSpaceLayout;