import "@/styles/index.scss";
import "@/styles/globals.scss";
import type {AppProps} from "next/app";
import {SessionProvider} from "next-auth/react";
import SecurePage from "@/pages/_secure";
import CurrentSpaceProvider from "@/components/CurrentSpaceProvider";
import Sidebar from "@/components/Sidebar";
import {Session} from "next-auth";

interface AppPropsExtended extends AppProps {
    pageProps: AppProps["pageProps"] & { session: Session };
}

function MyApp({Component, pageProps: {session, ...pageProps}}: AppPropsExtended) {
    // TODO organize so it makes sense
    // Rename Sidebar to layout
    // Use context update for menu items probably with default and ability to rename
    return (
        <SessionProvider session={session}>
            <div className="main-wrapper">
                <Sidebar items={[]}>
                    <SecurePage><CurrentSpaceProvider><Component {...pageProps} /></CurrentSpaceProvider></SecurePage>
                </Sidebar>
            </div>
        </SessionProvider>
    );
}

export default MyApp;
