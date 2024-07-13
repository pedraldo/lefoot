"use server";

import { signIn } from "@/auth";
import { getUserForLoginByEmail } from "@/queries/user";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Champ(s) invalide(s) !" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserForLoginByEmail(email);
  if (!existingUser || !existingUser.id) {
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
    console.log("try sign in with", email, password);
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    console.log("success", JSON.stringify(existingUser));
    return {
      success: {
        message: "Connexion réussie",
        user: existingUser,
      },
    };
  } catch (error) {
    console.log("error", JSON.stringify(error));
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
