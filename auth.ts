import { prisma } from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import { UserRole } from "@prisma/client";
import { getUserById } from "./data/user";

declare module "next-auth" {
  interface User {
    role?: UserRole;
  }
  interface Session {
    user?: User;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role?: UserRole;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      if (!user.id) {
        return false;
      }

      const existingUser = await getUserById(user.id);
      if (!existingUser) {
        console.log("User not found");
        return false;
      }

      // prevent sign in without email verifciation
      if (!existingUser?.emailVerified) {
        console.log(`User email not verified for ${existingUser?.email}`);
        return false;
      }

      // Can add 2FA check here

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        return {
          ...session,
          user: {
            ...session.user,
            role: token.role,
          },
        };
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }

      const existingUser = await getUserById(token.sub);

      if (!existingUser) {
        return token;
      }

      token.role = existingUser.role;
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
