import type {NextPage} from "next";
import Link from "next/link";
import {signIn, useSession} from "next-auth/react";
import Sidebar from "@/components/Sidebar";
import {useContext} from "react";
import {SearchContext} from "@/util/context";


const Home: NextPage = () => {
    const {data} = useSession();

    const {debouncedSearch} = useContext(SearchContext);

    return (
        <>
            <h1>{debouncedSearch}</h1>
            <h1>{data?.user?.email}</h1>
            <Link href="/dashboard">Dashboard</Link>
            <button onClick={() => signIn("google")}>Sign in</button>
        </>
    );
};

export default Home;