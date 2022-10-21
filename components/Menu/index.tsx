import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import {signIn, signOut, useSession} from "next-auth/react";

const Menu = () => {
    const {status} = useSession();
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography>Menu</Typography>
                    {status === "authenticated" ? (
                        <Button onClick={() => signOut()} color="secondary">Sign out</Button>
                    ) : (
                        <Button onClick={() => signIn()} color="secondary">Sign In</Button>
                    )}
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Menu;