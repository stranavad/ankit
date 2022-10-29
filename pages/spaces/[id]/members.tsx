import {NextPage} from "next";
import Members from "@/components/Members";
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

const MembersPage: NextPage = () => {
    return (
        <Sidebar items={sidebarItems}>
            <Members/>
        </Sidebar>
    );
};
export default MembersPage;