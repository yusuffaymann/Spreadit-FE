import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId:
        "983024045676-9bfe3k8g098glni21l9ka2k8qcah2uks.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        console.log(account.access_token); //Send Token to API here
        return true;
      }
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
