"use server";

import { prisma } from "@/lib/db";
import { getUserByEmail } from "@/queries/user";
import { AddUserSchema } from "@/schemas";
import { AddUserValues } from "../components/user/add-user-form";
import { logger } from "@/lib/logger";

export const addUser = async (values: AddUserValues) => {
  const { squadId, ...schemaValues } = values;
  const validatedFields = AddUserSchema.safeParse(schemaValues);
  logger.info(`add user - squadId ( ${squadId} ) ; email ( xxx )`);

  if (!validatedFields.success) {
    logger.error(`add user - invalidate fields`);
    return { error: "Champ(s) invalide(s) !" };
  }

  logger.info(`add user - valid fields`);
  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    logger.error(`add user - user does not exists`);
    return {
      error: `Aucun compte avec l'email '${email}' n'existe actuellement.`,
    };
  }

  logger.info(`add user - user email recognized from database`);
  await prisma.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      squads: {
        connect: [{ id: squadId }],
      },
    },
  });

  logger.info(`add user - OK`);
  return {
    success: `${existingUser.username} a bien été ajouté à l'équipe !`,
  };
};
