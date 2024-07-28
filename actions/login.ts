"use server";

import { signIn } from "@/auth";
import { logger } from "@/lib/logger";
import { getUserForLoginByEmail } from "@/queries/user";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  logger.info(`login - email ${values.email}`);

  if (!validatedFields.success) {
    logger.error(`login - invalid fields`);
    return { error: "Champ(s) invalide(s) !" };
  }

  logger.info(`login - valid fields`);
  const { email, password } = validatedFields.data;

  const existingUser = await getUserForLoginByEmail(email);
  if (!existingUser || !existingUser.id) {
    logger.error(`login - unregistered email`);
    return { error: "Email inconnu !" };
  }

  // if (!existingUser.emailVerified) {
  //   const verficiationToken = await generateVerificationToken(
  //     existingUser.email
  //   );
  //   await sendVerificationEmail(
  //     verficiationToken.email,
  //     verficiationToken.token
  //   );
  //   return { success: "Confirmation email sent!" };
  // }
  try {
    logger.info("login - try sign in for email ", email);
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    logger.info("login - success", JSON.stringify(existingUser));
    return {
      success: {
        message: "Connexion réussie",
        user: existingUser,
      },
    };
  } catch (error) {
    logger.error("login - error : ", JSON.stringify(error));
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Identifiants invalides" };
        case "AccessDenied":
          return { error: "Accès refusés. L'email n'a pas dû être vérifié." };
        default:
          return { error: "Erreur de connexion" };
      }
    }
    throw error;
  }
};
