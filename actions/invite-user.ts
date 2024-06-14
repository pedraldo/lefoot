"use server";

import { prisma } from "@/lib/db";
import { InviteUserSchema } from "@/schemas";
import { z } from "zod";

export const inviteUser = async (values: z.infer<typeof InviteUserSchema>) => {
  const validatedFields = InviteUserSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Champ(s) invalide(s)!" };
  }

  const { firstname, lastname } = validatedFields.data;

  await prisma.user.create({
    data: {
      firstname,
      lastname,
      username: `${firstname} ${lastname}`,
      isGuest: true,
    },
  });

  return { success: "L'invité·e a bien été créé·e !" };
};
