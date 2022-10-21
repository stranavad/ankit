import type {NextPage} from "next";
import Link from "next/link";
import {signIn, useSession} from "next-auth/react";


const Home: NextPage = () => {
    const {data} = useSession();

    return (
        <>
            <h1>Something</h1>
            <h1>{data?.user?.email}</h1>
            <Link href="/dashboard">Dashboard</Link>
            <button onClick={() => signIn("google")}>Sign in</button>
        </>
    );
};

export default Home;