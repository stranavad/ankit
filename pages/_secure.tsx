// import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
import {ReactElement} from "react";

interface SecureProps {
    children: ReactElement;
}

// const unprotectedRoutes: string[] = ["/"];

function SecurePage({children}: SecureProps) {
    // const router = useRouter();
    // const { status } = useSession();
    // // TODO add page where quizes are filled
    // useEffect(() => {
    // 	if (
    // 		status === "unauthenticated" &&
    // 		!unprotectedRoutes.includes(router.pathname)
    // 	) {
    // 		router.push("/");
    // 	} else if (
    // 		status === "authenticated" &&
    // 		unprotectedRoutes.includes(router.pathname)
    // 	) {
    // 		router.push("/app");
    // 	}
    // }, [status]);
    return children;
}

export default SecurePage;
