"use client";
import {ReactNode, useEffect, useState} from "react";
import CurrentSpaceProvider from "@/components/CurrentSpaceProvider";
import Tabs from "@/components/Navigation/Tabs";
import { Bars3Icon, ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { TopBarContext, type TopBarContextData, type TopBarItem } from "@/util/topBarContext";

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
    const [topBarData, setTopBarData] = useState<Omit<TopBarContextData, 'setSpace' | 'setQuestionnaire'>>({space: null, questionnaire: null});

    const setSpace = (space: TopBarItem) => {
        setTopBarData(data => ({...data, space}) );
    };

    const pathname = usePathname();

    const setQuestionnaire = (questionnaire: TopBarItem) => {
        setTopBarData(data => ({...data, questionnaire}) );
    };

    // Watch pathname changed
    useEffect(() => {
        if((pathname?.split('/') || []).length <= 5){
            setQuestionnaire(null);
        }
    }, [pathname]);



    return (
        <TopBarContext.Provider value={{...topBarData, setSpace, setQuestionnaire}}>
            <CurrentSpaceProvider spaceId={params.id}>
                <div className="w-full">
                    <nav
                        className="bg-slate-900 fixed left-0 sm:left-14 top-0 right-0 h-14 py-1 px-4 flex items-center justify-start">
                        <Bars3Icon className="sm:hidden w-6 h-6 text-white"/>
                        {topBarData.space && (
                            <>
                            <Link href={topBarData.space.path} className="text-slate-100 text-xl font-medium">{topBarData.space.title}</Link>

                            {topBarData.questionnaire && (
                                <>
                                    <ChevronDoubleRightIcon className="h-4 w-4 text-white mx-2"/>
                                    <Link href={topBarData.questionnaire.path} className="text-slate-100 text-lg font-medium">{topBarData.questionnaire.title}</Link>
                                </>
                            )}
                            </>
                        )}
                    </nav>
                    <div className="mt-20 ml-0  sm:ml-14 px-2 sm:px-0">
                        <Tabs routes={routes}/>
                        {children}
                    </div>
                </div>
            </CurrentSpaceProvider>
        </TopBarContext.Provider >
    );
};

export default CurrentSpaceLayout;