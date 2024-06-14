"use server";

import { signIn } from "@/auth";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/queries/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Champ(s) invalide(s) !" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
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
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        case "AccessDenied":
          return { error: "Access denied. Email may not be verified!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
  return { success: "Email sent!" };
};
