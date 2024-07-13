import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  const emailFrom = process.env.RESEND_EMAIL_FROM!;

  await resend.emails.send({
    from: emailFrom,
    to: email,
    subject: "Confirme ton email",
    html: `<p>Clique <a href="${confirmLink}">ici</a> pour confirmer ton email.</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;
  const emailFrom = process.env.RESEND_EMAIL_FROM!;

  await resend.emails.send({
    from: emailFrom,
    to: email,
    subject: "Mise à jour de votre mot de passe",
    html: `<p>Clique <a href="${resetLink}">ici</a> pour mettre à jour votre mot de passe.</p>`,
  });
};
