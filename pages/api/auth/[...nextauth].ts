import NextAuth from "next-auth";
import request from "@/util/request";
import GoogleProvider from "next-auth/providers/google";
import {login} from "@/api/auth";


export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.NEXTAUTH_CLIENT_ID || "",
            clientSecret: process.env.NEXTAUTH_CLIENT_SECRET || "",
        }),
    ],
    pages: {
        signIn: "/",
        // signOut: "/auth/signout",
        // error: "/auth/error", // Error code passed in query string as ?error=
        // newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    events: {
        async createUser(user) {
            await request({
                url: "/member",
                method: "post",
                data: {
                    userId: user.user.id,
                }
            });
        },
    },
    callbacks: {
        async signIn({account, user}) {
            if (!account) {
                return false;
            }
            const {data} = await login(account, user);
            user.accessToken = data.token;
            return true;
        },
        async jwt({token, user}) {
            if (user) {
                token.accessToken = user.accessToken;
            }
            return token;
        },
        async session({session, token}) {
            session.accessToken = token.accessToken;
            return session;
        },
    },
});
