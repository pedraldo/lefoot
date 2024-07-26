"use server";

import { prisma } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/queries/user";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Champ(s) invalide(s) !" };
  }

  const { email, password, firstname, lastname } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email déjà utilisé." };
  }

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
  return { success: "Compte créé !" };
};
