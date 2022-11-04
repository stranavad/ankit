"use client";
import "@/styles/index.scss";
import {SessionProvider} from "next-auth/react";

export default function RootLayout(props: any) {
    return (
        <html>
        <head>
            <title>ANKIT</title>
        </head>
        <body>
        <SessionProvider session={props.session}>
            {props.children}
        </SessionProvider>
        </body>
        </html>
    );
}
