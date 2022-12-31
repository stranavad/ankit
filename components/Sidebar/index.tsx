"use client";
import styles from "./index.module.scss";
import AnkitLogo from "@/public/ankitlogo.svg";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import {ReactElement, useMemo, useState} from "react";
import {SearchContext, SearchContextData} from "@/util/context";
import useDebounce from "@/util/debounce";
import {usePathname} from "next/navigation";
import {MdSpaceDashboard} from "react-icons/md";
import {AdjustmentsVerticalIcon, UsersIcon, HomeIcon, Bars3Icon} from "@heroicons/react/24/outline";

interface SidebarItem {
    title: string;
    path: string;
    icon: ReactElement;
}

interface MenuItem {
    title: string;
    path: string;
    search: boolean;
}

const items: SidebarItem[] = [
    {
        title: "Dashboard",
        path: "/",
        icon: <HomeIcon className="w-7 h-7 text-white"/>
    },
    {
        title: "Spaces",
        path: "/spaces",
        icon: <UsersIcon className="w-7 h-7 text-white"/>
    },
];


// FUNCTION TO GET TOP MENU ITEMS
const getTopMenuItems = (pathname: string | null): MenuItem[] => {
    if (!pathname) { // Usually doesn't happen
        return [];
    }

    const arr = pathname.split("/");
    arr.shift(); // First element is empty string

    if (arr[0] === "spaces") {
        if (arr[1] && arr[1] !== "invited") {
            if (arr[2] === "questionnaires" && arr[3]) {
                return [
                    {
                        title: "Dashboard",
                        path: `/${arr[0]}/${arr[1]}/${arr[2]}/${arr[3]}`,
                        search: false,
                    },
                    {
                        title: "Questions",
                        path: `/${arr[0]}/${arr[1]}/${arr[2]}/${arr[3]}/questions`,
                        search: false,
                    },
                    {
                        title: "settings",
                        path: `/${arr[0]}/${arr[1]}/${arr[2]}/${arr[3]}/settings`,
                        search: false,
                    },
                ];
            }
            return [
                {
                    title: "Dashboard",
                    path: `/${arr[0]}/${arr[1]}`,
                    search: false,
                },
                {
                    title: "Members",
                    path: `/${arr[0]}/${arr[1]}/members`,
                    search: true,
                },
                {
                    title: "Questionnaires",
                    path: `/${arr[0]}/${arr[1]}/questionnaires`,
                    search: true,
                }
            ];
        }
        return [
            {
                title: "Your spaces",
                path: `/${arr[0]}`,
                search: true,
            },
            {
                title: "Invited spaces",
                path: `/${arr[0]}/invited`,
                search: true,
            }
        ];
    }
    return [];
};


interface SidebarProps {
    items: SidebarItem[];
    children: ReactElement;
}

const Sidebar = ({children}: SidebarProps) => {
    const [search, setSearch] = useState<string>("");
    const debouncedSearch = useDebounce<string>(search);
    const pathname = usePathname();

    const topMenuItems = useMemo(() => getTopMenuItems(pathname), [pathname]);


    const searchContextData: SearchContextData = {
        search,
        debouncedSearch,
        clear: () => setSearch("")
    };

    const user = {
        image: "https://lh3.googleusercontent.com/a/ALm5wu2wmy5E615eNlSSOHs1Nemf-SfwSYZpD2yYeSCawpg=s96-c",
        name: "Vojtech Ruzicka"
    };
    return (
        <div className={styles.mainWrapper}>
            <div
                className="h-screen hidden sm:flex max-w-[3.5rem] flex-col bg-slate-900 items-center py-2 justify-between">
                <div className="max-w-full">
                    <Image src={AnkitLogo} alt="Ankit logo" width="60" height="60" className="w-5/6 mx-auto"/>
                    <div className="flex flex-col w-full items-center mt-8">
                        {items.map((item, index) => (
                            <Link href={item.path} key={index}
                                  className="mt-4">
                                {item.icon}
                            </Link>
                        ))}
                    </div>
                </div>
                <div>
                    <AdjustmentsVerticalIcon className="text-white h-8 w-8"/>
                </div>
            </div>
            <div className="w-full">
                <nav
                    className="bg-slate-900 fixed left-0 sm:left-14 top-0 right-0 h-14 py-1 px-4 flex items-center justify-between">
                    <div className="w-full sm:w-auto flex items-center sm:justify-start justify-between">
                        <Bars3Icon className="sm:hidden w-6 h-6 text-white"/>
                        <h3 className="text-slate-100 text-xl font-medium">Space name</h3>
                        <div className="hidden sm:block w-px h-8 bg-white mx-2"/>
                        <div className="hidden sm:block">
                            {topMenuItems.map((item, index) => (
                                <Link key={index} href={item.path}
                                      className="text-slate-200 text-sm mr-4">{item.title}</Link>
                            ))}
                        </div>
                    </div>
                    <input
                        placeholder="Search..."
                        className="hidden sm:block rounded-md bg-transparent border border-slate-500 p-1 outline-none ring-0 focus:ring-2 focus:ring-slate-600 text-slate-300"/>
                </nav>
                <div className="mt-20 px-2 sm:px-0">
                    {children}
                </div>
            </div>
            {/*<div className={styles.verticalWrapper}>*/}
            {/*    <div className={styles.topMenu}>*/}
            {/*        <div className={styles.topMenuLeftPart}>*/}
            {/*            <h3>Space name</h3>*/}
            {/*            <div className={styles.topMenuItems}>*/}
            {/*                {topMenuItems.map((item, index) => (*/}
            {/*                    <Link key={index} href={item.path}>{item.title}</Link>*/}
            {/*                ))}*/}
            {/*            </div>*/}

            {/*        </div>*/}
            {/*        {topMenuItems.find((item) => item.path === pathname)?.search ? (*/}
            {/*            <input className="outline light" value={search} onChange={(e) => setSearch(e.target.value)}*/}
            {/*                   placeholder="Search..."/>*/}
            {/*        ) : <></>}*/}
            {/*    </div>*/}
            {/*    <div className={styles.childrenWrapper}>*/}
            {/*        <SearchContext.Provider value={searchContextData}>*/}
            {/*            {children}*/}
            {/*        </SearchContext.Provider>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
};

export default Sidebar;