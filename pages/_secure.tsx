import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import {ReactElement, useEffect} from "react";

interface SecureProps {
    children: ReactElement;
}

const unprotectedRoutes: string[] = ["/"];

function SecurePage({children}: SecureProps) {
    const router = useRouter();
    const {status} = useSession();

    useEffect(() => {
        if (
            status === "unauthenticated" &&
            !unprotectedRoutes.includes(router.pathname)
        ) {
            router.push("/");
        }
    }, [status]);

    return children;
}

export default SecurePage;
