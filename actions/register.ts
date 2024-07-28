"use server";

import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/queries/user";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  logger.info(`register - with email ( xxx )`);

  if (!validatedFields.success) {
    logger.error(`register - invalid fields`);
    return { error: "Champ(s) invalide(s) !" };
  }

  logger.info(`register - valid fields`);
  const { email, password, firstname, lastname } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    logger.error(`register - email already used`);
    return { error: "Email déjà utilisé." };
  }

  logger.info(`register - email not already used`);
  await prisma.user.create({
    data: {
      firstname,
      lastname,
      username: `${firstname} ${lastname[0]}.`,
      email,
      password: hashedPassword,
    },
  });

  // const verficationToken = await generateVerificationToken(email);
  // await sendVerificationEmail(verficationToken.email, verficationToken.token);

  // return { success: "Confirmation email sent!" };
  logger.info(`register - user correctly created`);
  return { success: "Compte créé !" };
};
