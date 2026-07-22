import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { db } from "./db";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
  try {
    console.log("=== LOGIN ATTEMPT ===");
    console.log("Email:", credentials?.email);

    if (!credentials?.email || !credentials?.password) {
      console.log("Missing credentials");
      return null;
    }

    const user = await db.user.findUnique({
      where: {
        email: credentials.email,
      },
    });

    console.log("User object:", user);

    if (!user) {
      console.log("User not found");
      return null;
    }

    console.log("Stored hash:", user.password);

    const passwordMatch = await compare(
      credentials.password,
      user.password
    );

    console.log("Password match:", passwordMatch);

    if (!passwordMatch) {
      return null;
    }

    console.log("Login successful");

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      workspaceId: user.workspaceId,
    };
  } catch (err) {
    console.error("AUTHORIZE ERROR:", err);
    throw err;
  }
}
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
    token.role = user.role;
token.workspaceId = user.workspaceId;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
session.user.role = token.role as string;
session.user.workspaceId = token.workspaceId as string;
      }

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};