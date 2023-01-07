"use client";
import Link from "next/link";
import {signIn, signOut, useSession} from "next-auth/react";
import AnkitLogo from "@/public/ankit_logo.png";
import Image from "next/image";


const Home = () => {
    const {status} = useSession();

    return (
        <>
            <div>
                <div>
                    <Image src={AnkitLogo} alt="Ankit logo" height="40" width="40"/>
                    <h1>Ankit</h1>
                </div>
                <div>
                    <Link href="/">About</Link>
                    <Link href="/">Contact</Link>
                    {status === "authenticated" ? (
                        <span onClick={() => signOut()}>Sign out</span>
                    ) : (
                        <span onClick={() => signIn("google")}>Sign in</span>
                    )}
                </div>
            </div>
            <div>
                <div>
                    {status === "authenticated" ? (
                        <>
                            <h2>You're already logged in</h2>
                            <button className="outline"><Link href="/spaces">Check out your spaces</Link></button>
                        </>
                    ) : (
                        <>
                            <h2>Welcome to Ankit</h2>
                            <h3>"The faster way to get your answers"</h3>
                            <button className="filled" onClick={() => signIn("google")}>Sign in to continue</button>
                        </>
                    )}
                </div>

            </div>

        </>
    );
};

export default Home;