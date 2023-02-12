"use client";
import {SessionProvider} from "next-auth/react";
import {TopBarContext, TopBarContextData, TopBarItem} from "@/util/topBarContext";
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import {Bars3Icon, ChevronDoubleRightIcon} from "@heroicons/react/24/outline";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";

const AppLayout = (props: any) => {
    const [topBarData, setTopBarData] = useState<Omit<TopBarContextData, "setSpace" | "setQuestionnaire">>({
        space: null,
        questionnaire: null
    });

    const pathname = usePathname();

    const setSpace = (space: TopBarItem) => {
        setTopBarData(data => ({...data, space}));
    };


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

    const showOverlays = (pathname?.split("/").length || 0) > 2;

    return (
        <TopBarContext.Provider value={{...topBarData, setSpace, setQuestionnaire}}>
            <SessionProvider session={props.session}>
                {showOverlays && (
                    <>
                        <Sidebar/>
                        <nav
                            className="bg-slate-900 fixed z-10 left-0 sm:left-14 top-0 right-0 h-14 py-1 px-4 flex items-center justify-between sm:justify-start">
                            <div className="flex items-center">
                                {topBarData.space && (
                                    <>
                                        <Link href={topBarData.space.path}
                                            className="text-slate-100 text-md md:text-xl font-medium">{topBarData.space.title}</Link>

                                        {topBarData.questionnaire && (
                                            <>
                                                <ChevronDoubleRightIcon className="h-4 w-4 text-white mx-2"/>
                                                <Link href={topBarData.questionnaire.path}
                                                    className="text-slate-100 text-sm md:text-lg font-medium">{topBarData.questionnaire.title}</Link>
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                            <Bars3Icon className="sm:hidden w-6 h-6 text-white"/>
                        </nav>
                    </>
                )}
                <div className={showOverlays ? "mt-20 ml-0 sm:ml-[3.5rem]" : ""}>
                    {props.children}
                </div>
            </SessionProvider>
        </TopBarContext.Provider>
    );
};

export default AppLayout;