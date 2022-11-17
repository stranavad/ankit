"use client";
import styles from "./index.module.scss";
import AnkitLogo from "@/public/ankit_logo.png";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import {ReactElement, useState} from "react";
import TextInput from "@/components/base/TextInput";
import {SearchContext, SearchContextData} from "@/util/context";
import useDebounce from "@/util/debounce";

export interface SidebarItem {
    title: string;
    path: string;
}

const items: SidebarItem[] = [
    {
        title: "Hello",
        path: "/spaces"
    },
    {
        title: "Hello",
        path: "/spaces"
    }
];

interface SidebarProps {
    items: SidebarItem[];
    children: ReactElement;
}

const Sidebar = ({children}: SidebarProps) => {
    const [search, setSearch] = useState<string>("");
    const debouncedSearch = useDebounce<string>(search);

    const searchContextData: SearchContextData = {
        search,
        debouncedSearch,
        clear: () => setSearch("")
    };

    // const router = useRouter();
    const user = {
        image: "https://lh3.googleusercontent.com/a/ALm5wu2wmy5E615eNlSSOHs1Nemf-SfwSYZpD2yYeSCawpg=s96-c",
        name: "Vojtech Ruzicka"
    };
    return (
        <div className={styles.mainWrapper}>
            <div className={styles.container}>
                <div className={styles.imageContainer}>
                    <Image src={AnkitLogo} alt="Ankit logo"/>
                </div>
                <div className={styles.items}>
                    {items.map((item, index) => (
                        <Link href={item.path} key={index}>
                            <div className={classNames(styles.item, {[styles.active]: true})}>
                                <span>{item.title}</span>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className={styles.settings}>
                    <Image src={user.image}
                           width="50" height="50" style={{borderRadius: "50%"}} alt="User image"/>
                    <span className={styles.name}>{user.name}</span>
                </div>
            </div>
            <div className={styles.verticalWrapper}>
                <div className={styles.topMenu}>
                    <h3>Space name</h3>
                    <TextInput value={search} onChange={(e) => setSearch(e.target.value)}/>
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