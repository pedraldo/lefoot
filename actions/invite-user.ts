"use server";

import { InviteUserValues } from "@/components/user/invite-form";
import { prisma } from "@/lib/db";
import { InviteUserSchema } from "@/schemas";

export const inviteUser = async (values: InviteUserValues) => {
  const { squadId, ...schemaValues } = values;
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
