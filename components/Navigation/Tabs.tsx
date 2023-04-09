import { usePathname, useSelectedLayoutSegment, useSelectedLayoutSegments } from "next/navigation";
import Tab from "./Tab";

interface TabsProps {
    routes: { name: string, path: string }[];
}

const Tabs = ({ routes }: TabsProps) => {

    const pathname = usePathname();
    const segment = useSelectedLayoutSegment();
    const segments = useSelectedLayoutSegments();

    const getLink = (path: string) => {
        if (!pathname) {
            return "";
        }

        let pathWithoutSegment = pathname;

        if (segment) {
            pathWithoutSegment = pathWithoutSegment.split(`/${segment}`)[0];
        }

        return `${pathWithoutSegment}${path ? `/${path}` : ""}`;
    };

    if (segments.length > 1) {
        return null;
    }

    return (
        <div className="mb-5 px-3 max-w-5xl mx-auto flex justify-between gap-3">
            {routes.map((route, index) => (
                <Tab key={index} href={getLink(route.path)}
                     width={100 / routes.length} text={route.name} />
            ))}
        </div>
    );
};

export default Tabs;