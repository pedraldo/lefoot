import ResetPasswordEmail from "@/emails/reset";
import { Resend } from "resend";
import { logger } from "./logger";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  const emailFrom = process.env.RESEND_EMAIL_FROM!;

  await resend.emails.send({
    from: emailFrom,
    to: email,
    subject: "Le Foot - Confirmation de ton email",
    html: `<p>Clique <a href="${confirmLink}">ici</a> pour confirmer ton email.</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  logger.info("mail - verification email for email : " + email);
  const resetLink = `${domain}/auth/new-password?token=${token}`;
  const emailFrom = process.env.RESEND_EMAIL_FROM!;

  await resend.emails.send({
    from: emailFrom,
    to: email,

    subject: "Le Foot - Mise à jour de ton mot de passe",
    react: ResetPasswordEmail({ resetPasswordLink: resetLink }),
  });
  logger.info(`mail - mail sent`)
};
