"use client";
import {SessionProvider} from "next-auth/react";
import {Inter} from "@next/font/google";
import "./globals.css";

const inter = Inter({
    weight: ["400", "500", "600"],
    subsets: ["latin"]
});

export default function RootLayout(props: any) {
    return (
        <html lang="en" className={inter.className}>
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
