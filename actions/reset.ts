"use server";

import { logger } from "@/lib/logger";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { getUserByEmail } from "@/queries/user";
import { ResetSchema } from "@/schemas";
import { z } from "zod";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validateFields = ResetSchema.safeParse(values);
  logger.info(`reset - for email ( xxx )`);

  if (!validateFields.success) {
    logger.error(`reset - invalid fields`);
    return {
      error: "Email invalide",
    };
  }

  logger.info(`reset - valid fields`);
  const { email } = validateFields.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    logger.error(`reset - email not recognized from database`);
    return {
      error: "Email non reconnu",
    };
  }

  logger.info(`reset - email recognized`);
  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  logger.info(`reset - password reinitialization mail sent`);
  return { success: "Email de reinitialisation envoyé" };
};
