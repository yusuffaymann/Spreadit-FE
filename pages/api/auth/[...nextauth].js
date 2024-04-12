import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import apiHandler from "../../../src/app/utils/apiHandler";
import storeCookies from "@/app/utils/storeCookies";
import { SessionContext } from "next-auth/react";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const url = "/google/oauth";
        const response = await apiHandler(url, "POST", {Authorization: account.access_token, remember_me: true});
        user.data = response;
        return true;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.data = user.data;
      }
      return token;
    },
    async session({ session, token }) {
      session.data = token.data;
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
