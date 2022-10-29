import "@/styles/index.scss";
import "@/styles/globals.scss";
import type {AppProps} from "next/app";
import {SessionProvider} from "next-auth/react";
import SecurePage from "@/pages/_secure";
import CurrentSpaceProvider from "@/components/CurrentSpaceProvider";

interface AppPropsExtended extends AppProps {
    pageProps: AppProps["pageProps"] & { session: any };
}

function MyApp({Component, pageProps: {session, ...pageProps}}: AppPropsExtended) {
    return (
        <SessionProvider session={session}>
            <div className="main-wrapper">
                <SecurePage><CurrentSpaceProvider><Component {...pageProps} /></CurrentSpaceProvider></SecurePage>
            </div>
        </SessionProvider>
    );
}

export default MyApp;
