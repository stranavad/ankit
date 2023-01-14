"use client";
import { SessionProvider } from "next-auth/react";

export default function AppLayout(props: any){
    return (
        <SessionProvider session={props.session}>
            {props.children}
        </SessionProvider>
    )
}