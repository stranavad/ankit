import { type ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    weight: ["400", "500", "600"],
    subsets: ["latin"]
});

export default function RootLayout(props: { children: ReactNode | ReactNode[] }) {
    return (
        <html lang="en" className={inter.className}>

        <head>
            <title>ANKIT</title>
        </head>
        <body>
        {props.children}
        </body>
        </html>
    );
}
