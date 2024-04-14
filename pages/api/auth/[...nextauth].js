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
      clientId: "983024045676-9bfe3k8g098glni21l9ka2k8qcah2uks.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const url = "/google/oauth";
        const response = await apiHandler(url, "POST", {googleToken: account.access_token , remember_me: true});
        console.log(response)
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
