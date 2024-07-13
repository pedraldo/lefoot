"use server";

import { LinkGuestValues } from "@/components/user/link-guest-form";
import { prisma } from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { getUserByEmail } from "@/queries/user";
import { LinkGuestSchema } from "@/schemas";

export const linkGuest = async (values: LinkGuestValues) => {
  const { squadId, ...schemaValues } = values;
  const validatedFields = LinkGuestSchema.safeParse(schemaValues);

  if (!validatedFields.success) {
    return { error: "Champ(s) invalide(s) !" };
  }

  const { guestId, email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    try {
      // Replace guestId by existingUser.id in "_TeamToUser"
      // Target teams related to squadId
      console.log(
        "Link guest to existing user.\nTry to update teamToUser relation replacing guest id by existing user id ..."
      );

      const nbRowsAffected = await prisma.$executeRaw`
        update "_TeamToUser" as teamtouser
        set "B" = ${existingUser.id}
        from "Team" team
        where team.id = teamtouser."A"
        and team."squadId" = ${squadId}
        and teamtouser."B" = ${guestId}
      `;

      if (nbRowsAffected < 1) {
        console.error(
          "Error while updating teamToUser relation : nb rows affected < 1"
        );
        return {
          error: `Erreur lors de la tentative de remplacement du compte invité par le compte de l'email ${email}.`,
        };
      } else {
        console.log(
          `Replace guest id by existing user id : OK ==> ${nbRowsAffected} rows affected.`
        );
      }
    } catch (error) {
      console.error(
        "Error while updating teamToUser relation : ",
        JSON.stringify(error)
      );
      return {
        error: `Erreur lors de la tentative de remplacement du compte invité par le compte de l'email ${email}.`,
      };
    }

    try {
      // Link existingUser to squad and unlink guest from squad
      console.log(
        "Try to link existing user to squad and unlink guest from squad ..."
      );
      await prisma.squad.update({
        where: {
          id: squadId,
        },
        data: {
          users: {
            connect: [{ id: existingUser.id }],
            disconnect: [{ id: guestId }],
          },
        },
      });
      console.log(
        "Link existing user to squad and unlink guest from squad : OK"
      );
    } catch (error) {
      console.error(
        "Error while connecting existing user and disconnecting guest user to squad : ",
        JSON.stringify(error)
      );
      return {
        error: `Erreur de la déconnexion de l'invité et la connexion du compte (email : ${email}) avec l'équipe.`,
      };
    }

    try {
      // Remove guest user from database
      console.log("Try to remove guest user from database ...");
      await prisma.user.delete({
        where: {
          id: guestId,
        },
      });
      console.log("Remove guest user from database : OK");
    } catch (error) {
      console.error(
        "Error while deleting guest user from database : ",
        JSON.stringify(error)
      );
      return {
        error: `Erreur de la suppresion de l'utilisateir invité de la base de données.`,
      };
    }

    console.log(`Link guest to existing user with email ${email}: ALL GOOD.`);
    return {
      success: `Le compte invité a été remplacer par le compte existant avec l'email ${email}.`,
    };
  }

  await prisma.user.update({
    where: {
      id: guestId,
    },
    data: {
      email,
      guestSquads: {
        disconnect: [{ id: squadId }],
      },
    },
  });

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return {
    success:
      "Un email de création de mot de passe a été envoyé à l'adresse indiquée !",
  };
};
