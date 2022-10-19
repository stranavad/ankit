// import "@/styles/index.scss";
import type {AppProps} from "next/app";
import {SessionProvider} from "next-auth/react";
import SecurePage from "@/pages/_secure";

// @ts-ignore
function MyApp({Component, pageProps: {session, ...pageProps}}: AppProps) {
    return (
        <SessionProvider session={session}>
            <div className="main-wrapper">
                <SecurePage><Component {...pageProps} /></SecurePage>
            </div>
        </SessionProvider>
    );
}

export default MyApp;
