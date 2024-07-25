"use server";

import { CreateGuestValues } from "@/components/user/create-guest-form";
import { prisma } from "@/lib/db";
import { CreateGuestSchema } from "@/schemas";

export const createGuest = async (values: CreateGuestValues) => {
  const { squadId, ...schemaValues } = values;
  const validatedFields = CreateGuestSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Champ(s) invalide(s)!" };
  }

  const { firstname, lastname } = validatedFields.data;

  await prisma.user.create({
    data: {
      firstname,
      lastname,
      username: `${firstname} ${lastname}`,
      squads: {
        connect: [{ id: values.squadId }],
      },
      guestSquads: {
        connect: [{ id: values.squadId }],
      },
      targetedSquad: {
        connect: { id: values.squadId },
      },
    },
  });

  return { success: "L'invité·e a bien été créé·e !" };
};
