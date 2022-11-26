"use client";
import styles from "./index.module.scss";
import AnkitLogo from "@/public/ankit_logo.png";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import {ReactElement, useMemo, useState} from "react";
import {SearchContext, SearchContextData} from "@/util/context";
import useDebounce from "@/util/debounce";
import {usePathname} from "next/navigation";

interface SidebarItem {
    title: string;
    path: string;
}

interface MenuItem {
    title: string;
    path: string;
    search: boolean;
}

const items: SidebarItem[] = [
    {
        title: "Spaces",
        path: "/spaces"
    },
    {
        title: "Dashboard",
        path: "/"
    },
    {
        title: "Homepage",
        path: "/"
    }
];


// FUNCTION TO GET TOP MENU ITEMS
const getTopMenuItems = (pathname: string | null): MenuItem[] => {
    if (!pathname) { // Usually doesn't happen
        return [];
    }

    const arr = pathname.split("/");
    arr.shift(); // First element is empty string

    if (arr[0] === "spaces") {
        if (arr[1]) {
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
                path: `/${arr[0]}`,
                search: true,
            }
        ];
    } else if (arr[0] === "questionnaire") {
        return [
            {
                title: "Dashboard",
                path: `/${arr[0]}/${arr[1]}/`,
                search: false,
            },
            {
                title: "Questions",
                path: `/${arr[0]}/${arr[1]}/questions`,
                search: false,
            },
            {
                title: "settings",
                path: `/${arr[0]}/${arr[1]}/settings`,
                search: false,
            },
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
    const [small, setSmall] = useState<boolean>(true);
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
            <div className={classNames(styles.container, {[styles.small]: small})}>
                <div className={styles.imageContainer}>
                    <Image src={AnkitLogo} alt="Ankit logo" onClick={() => setSmall(s => !s)}/>
                </div>
                <div className={styles.items}>
                    {items.map((item, index) => (
                        <Link href={item.path} key={index}
                              className={classNames(styles.item, {[styles.active]: pathname === item.path})}>
                            {item.title}
                        </Link>
                    ))}
                </div>
                <div className={styles.settings}>
                    <Image src={user.image} width="50" height="50"
                           style={{borderRadius: "50%"}} alt="User image"/>
                </div>
            </div>
            <div className={styles.verticalWrapper}>
                <div className={styles.topMenu}>
                    <div className={styles.topMenuLeftPart}>
                        <h3>Space name</h3>
                        <div className={styles.topMenuItems}>
                            {topMenuItems.map((item, index) => (
                                <Link key={index} href={item.path}>{item.title}</Link>
                            ))}
                        </div>

                    </div>
                    {topMenuItems.find((item) => item.path === pathname)?.search ? (
                        <input className="outline light" value={search} onChange={(e) => setSearch(e.target.value)}
                               placeholder="Search..."/>
                    ) : <></>}
                </div>
                <div className={styles.childrenWrapper}>
                    <SearchContext.Provider value={searchContextData}>
                        {children}
                    </SearchContext.Provider>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;