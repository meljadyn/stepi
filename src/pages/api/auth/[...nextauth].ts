import NextAuth, { SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dotenv from "dotenv";
dotenv.config();

export const authOptions = {
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      authorize: async (credentials) => {
        const authResponse = await fetch(`${process.env.SERVER}/api/sessions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

        if (!authResponse.ok) {
          return null;
        }

        const data = await authResponse.json();
        return data.user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    newUser: "/sign-up",
  },
};

export default NextAuth(authOptions);
