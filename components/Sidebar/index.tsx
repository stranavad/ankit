import AnkitLogo from "@/public/ankitlogo.svg";
import Image from "next/image";
import Link from "next/link";
import {ReactElement} from "react";
import {AdjustmentsVerticalIcon, UsersIcon, HomeIcon, Bars3Icon} from "@heroicons/react/24/outline";

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

interface SidebarProps {
    children: ReactElement;
}

const Sidebar = ({children}: SidebarProps) => {
        return (
        <div>
            <div
                className="hidden fixed top-0 left-0 bottom-0 sm:flex max-w-[3.5rem] flex-col bg-slate-900 items-center py-2 justify-between">
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
            {children}
        </div>
    );
};

export default Sidebar;