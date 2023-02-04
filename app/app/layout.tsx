"use client";
import {SessionProvider} from "next-auth/react";
import {TopBarContext, TopBarContextData, TopBarItem} from "@/util/topBarContext";
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import {Bars3Icon, ChevronDoubleRightIcon} from "@heroicons/react/24/outline";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";

export default function AppLayout(props: any) {
    const [topBarData, setTopBarData] = useState<Omit<TopBarContextData, "setSpace" | "setQuestionnaire">>({
        space: null,
        questionnaire: null
    });

    const setSpace = (space: TopBarItem) => {
        setTopBarData(data => ({...data, space}));
    };

    const pathname = usePathname();

    const setQuestionnaire = (questionnaire: TopBarItem) => {
        setTopBarData(data => ({...data, questionnaire}));
    };

    // Watch pathname changed
    useEffect(() => {
        const pathLength = pathname?.split("/").length || 0;
        if (pathLength <= 5) {
            setQuestionnaire(null);
        }

        if (pathLength <= 4) {
            if (pathname?.includes("dashboard")) {
                setSpace({title: "Dashboard", path: `/app/dashboard`});
            } else if (pathname?.includes("spaces")) {
                setSpace({title: "Spaces", path: "/app/spaces"});
            } else {
                setSpace(null);
            }
        }
    }, [pathname]);

    return (
        <TopBarContext.Provider value={{...topBarData, setSpace, setQuestionnaire}}>
            <SessionProvider session={props.session}>
                <Sidebar/>
                <nav
                    className="bg-slate-900 fixed left-0 sm:left-14 top-0 right-0 h-14 py-1 px-4 flex items-center justify-start">
                    <Bars3Icon className="sm:hidden w-6 h-6 text-white"/>
                    {topBarData.space && (
                        <>
                            <Link href={topBarData.space.path}
                                  className="text-slate-100 text-xl font-medium">{topBarData.space.title}</Link>

                            {topBarData.questionnaire && (
                                <>
                                    <ChevronDoubleRightIcon className="h-4 w-4 text-white mx-2"/>
                                    <Link href={topBarData.questionnaire.path}
                                          className="text-slate-100 text-lg font-medium">{topBarData.questionnaire.title}</Link>
                                </>
                            )}
                        </>
                    )}
                </nav>
                <div className="mt-20 ml-0 sm:ml-[3.5rem]">
                    {props.children}
                </div>
            </SessionProvider>
        </TopBarContext.Provider>
    );
}