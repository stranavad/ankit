import type {NextPage} from "next";
import {signIn, useSession} from "next-auth/react";
import {useState} from "react";
import {getSpaces} from "@/api/space";

const Home: NextPage = () => {
    const {status, data} = useSession();
    const [spaces, setSpaces] = useState<any[]>([]);

    const loadSpaces = () => {
        getSpaces().then((response) => {
            console.log(response);
        });
    };
    return (
        <>
            <h1>Something</h1>
            <h1>{data?.user?.email}</h1>
            <button onClick={() => loadSpaces()}>Hello</button>
            <button onClick={() => signIn("google")}>Sign in</button>
        </>
    );
};

export default Home;