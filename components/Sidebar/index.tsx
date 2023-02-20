import AnkitLogo from "@/public/ankitlogo.svg";
import Image from "next/image";
import Link from "next/link";
import {ReactElement} from "react";
import { UsersIcon, HomeIcon} from "@heroicons/react/24/outline";

interface SidebarItem {
    title: string;
    path: string;
    icon: ReactElement;
}

const items: SidebarItem[] = [
    {
        title: "Dashboard",
        path: "/app/dashboard",
        icon: <HomeIcon className="w-7 h-7 text-white"/>
    },
    {
        title: "Spaces",
        path: "/app/spaces",
        icon: <UsersIcon className="w-7 h-7 text-white"/>
    },
];


const Sidebar = () => {
    return (
        <div
            className="hidden fixed top-0 left-0 bottom-0 sm:flex max-w-[3.5rem] flex-col bg-indigo-900 w-[60px] items-center py-2 justify-between">
            <div className="flex flex-col w-full items-center">
                {items.map((item, index) => (
                    <Link href={item.path} key={index}
                            className="mt-4">
                        {item.icon}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;