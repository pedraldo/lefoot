import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { logger } from "./lib/logger";
import { getUserByEmail } from "./queries/user";
import { LoginSchema } from "./schemas";

export default {
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        // Validate LoginSchema here in case someone try to access to the app
        // in a different way than Front application
        logger.info("auth config - credentials authorize - start");
        const validateFields = LoginSchema.safeParse(credentials);

        if (validateFields.success) {
          const { email, password } = validateFields.data;
          logger.info(
            `auth config - credentials authorize - for user with email xxx`
          );
          const user = await getUserByEmail(email);

          if (!user || !user.password) {
            logger.warn(
              `auth config - credentials authorize - user not recognized`
            );
            return null;
          }

          logger.info("auth config - credentials authorize - user recognized");
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) {
            return user;
          }
          logger.warn(
            "auth config - credentials authorize - passwords don't match"
          );
        }
        logger.info("Credentials authorize - final null return");
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
