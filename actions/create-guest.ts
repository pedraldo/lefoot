"use server";

import { CreateGuestValues } from "@/components/user/create-guest-form";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import { CreateGuestSchema } from "@/schemas";

export const createGuest = async (values: CreateGuestValues) => {
  const { squadId, ...schemaValues } = values;
  const validatedFields = CreateGuestSchema.safeParse(schemaValues);
  logger.info(
    `create guest - squadId ( ${squadId} ) ; firstname ( ${values.firstname} ) ; lastname ( ${values.lastname} )`
  );

  if (!validatedFields.success) {
    logger.error(`create guest - invalid fields`);
    return { error: "Champ(s) invalide(s)!" };
  }

  logger.info(`create guest - valid fields`);
  const { firstname, lastname } = validatedFields.data;

  await prisma.user.create({
    data: {
      firstname,
      lastname,
      username: `${firstname} ${lastname[0]}.`,
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

  logger.info(`create guest - OK`);
  return { success: "L'invité·e a bien été créé·e !" };
};
