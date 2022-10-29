import type {NextPage} from "next";
import Spaces from "@/components/Spaces";
import Sidebar, {SidebarItem} from "@/components/Sidebar";

const sidebarItems: SidebarItem[] = [
    {
        title: "Dashboard",
        path: "/dashboard"
    },
    {
        title: "Spaces",
        path: "/spaces"
    },
    {
        title: "Space 20 members",
        path: "/spaces/20/members"
    }
];

const SpacesPage: NextPage = () => {
    return (
        <Sidebar items={sidebarItems}>
            <Spaces/>
        </Sidebar>
    );
};

export default SpacesPage;