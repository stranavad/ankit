import NextAuth from "next-auth";
import request from "@/util/request";
import GoogleProvider from "next-auth/providers/google";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.NEXTAUTH_CLIENT_ID || "",
            clientSecret: process.env.NEXTAUTH_CLIENT_SECRET || "",
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 60 * 24,
    },
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
        async signIn({account}) {
            if (!account) {
                return false;
            }
            const acccountToUpdate = await prisma.account.findUnique({
                where: {
                    provider_providerAccountId: {
                        provider: account.provider,
                        providerAccountId: account.providerAccountId,
                    }
                }
            });
            if (acccountToUpdate) {
                await prisma.account.update({
                    where: {
                        provider_providerAccountId: {
                            provider: account.provider,
                            providerAccountId: account.providerAccountId,
                        },
                    },
                    data: {
                        access_token: account.access_token,
                        expires_at: account.expires_at,
                        id_token: account.id_token,
                        refresh_token: account.refresh_token,
                        session_state: account.session_state,
                        scope: account.scope,
                    },
                });
            }
            await prisma.$disconnect();
            return true;
        },
        async jwt({token, account, user}) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token;
                token.userId = user?.id;
            }
            return token;
        },
        async session({session, token}) {
            // Send properties to the client, like an access_token from a provider.
            session.accessToken = token?.accessToken;
            session.userId = token.userId as number;
            return session;
        },
    },
});
