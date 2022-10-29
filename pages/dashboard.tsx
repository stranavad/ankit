import type {NextPage} from "next";
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

const Home: NextPage = () => {

    return (
        <>
            <Sidebar items={sidebarItems}>
                <h1>Dashboard</h1>
            </Sidebar>
        </>
    );
};

export default Home;