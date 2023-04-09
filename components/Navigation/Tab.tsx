import Link from "next/link";
import { usePathname } from "next/navigation";

interface TabProps {
    width: number;
    href: string;
    text: string;
}

const Tab = ({width, href, text}: TabProps) => {
    const pathname = usePathname();

    const active = pathname === href;

    return (
        <div style={{width: `${width}%`}}>
            <Link href={href} className={`block ${active ? "bg-white text-slate-900": "bg-slate-100 text-slate-600 hover:bg-slate-50 hover:text-slate-800"} transition-colors duration-100 font-medium p-2 w-full text-center rounded-md`}>
                {text}
            </Link>
        </div>
    );
};

export default Tab;