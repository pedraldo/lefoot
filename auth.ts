import { prisma } from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import { UserRole } from "@prisma/client";
import { logger } from "./lib/logger";
import { getUserById } from "./queries/user";

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
      logger.info(`auth - link account`);
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
      logger.info(`auth - link account OK`);
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      logger.info(`auth - sign in`);
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      if (!user.id) {
        logger.error("signIn callback - no userId");
        return false;
      }

      logger.info(`auth - sign in - provider credentials ; user id valid`);
      const existingUser = await getUserById(user.id);
      if (!existingUser) {
        // prevent sign in without email verifciation
        logger.error("auth - sign in - user not found.");
        return false;
      }

      // if (!existingUser?.emailVerified) {
      //   // prevent sign in without email verifciation
      //   logger.info("User email not verified");
      //   return false;
      // }

      // Can add 2FA check here

      logger.info("auth - sign in - success for email ", existingUser.email);
      return true;
    },
    async session({ token, session }) {
      logger.info(`auth - session`);
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        logger.info(`auth - session - return session extended with user role`);
        return {
          ...session,
          user: {
            ...session.user,
            role: token.role as UserRole,
          },
        };
      }
      logger.info(`auth - session - return session`);
      return session;
    },
    async jwt({ token }) {
      logger.info(`auth - jwt`);
      if (!token.sub) {
        logger.warn(`auth - jwt - no token sub data`);
        return token;
      }

      logger.info(`auth - jwt - token has sub data`);
      const existingUser = await getUserById(token.sub);

      if (!existingUser) {
        logger.warn(`auth - jwt - user not recognized with token sub data`);
        return token;
      }

      token.role = existingUser.role;
      logger.info(`auth - jwt - user recognized`);
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
