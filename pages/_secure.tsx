import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import {ReactElement} from "react";

interface SecureProps {
    children: ReactElement;
}

const unprotectedRoutes: string[] = ["/"];

function SecurePage({children}: SecureProps) {
    const router = useRouter();
    const {status} = useSession();

    if(status === "unauthenticated" && !unprotectedRoutes.includes(router.pathname)){
        return <h2>Unauthenticated, return back</h2>
    }

    return children;
}

export default SecurePage;
