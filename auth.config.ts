import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
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
        console.log("Credentials authorize start");
        const validateFields = LoginSchema.safeParse(credentials);

        if (validateFields.success) {
          const { email, password } = validateFields.data;
          console.log("Credentials authorize get user by email");
          const user = await getUserByEmail(email);
          console.log("Credentials authorize user", user);

          if (!user || !user.password) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) {
            return user;
          }
          console.log("Credentials authorize passwords don't match");
        }
        console.log("Credentials authorize final null return");
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
