import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email requis",
  }),
  password: z.string().min(6, {
    message: "Le mot de passe doit contenir au moins 6 caractères",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email requis",
  }),
  password: z.string().min(6, {
    message: "Le mot de passe doit contenir au moins 6 caractères",
  }),
  firstname: z.string().min(1, {
    message: "Veuillez entrer un prénom",
  }),
  lastname: z.string().min(1, {
    message: "Veuillez entrer un nom",
  }),
});

export const InviteUserSchema = z.object({
  firstname: z.string().min(1, {
    message: "Veuillez entrer un prénom",
  }),
  lastname: z.string().min(1, {
    message: "Veuillez entrer un nom",
  }),
});

export const LinkGuestSchema = z.object({
  guestId: z.string().cuid({
    message: "Veuillez entrer un nom",
  }),
  email: z.string().email({
    message: "Email requis",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email requis",
  }),
});

export const NewPasswordSchema = z
  .object({
    password: z.string().min(6, {
      message: "Le mot de passe doit contenir au moins 6 caractères",
    }),
    confirm: z.string().min(6, {
      message: "Le mot de passe doit contenir au moins 6 caractères",
    }),
  })
  .refine(({ password, confirm }) => password === confirm, {
    message: "Mots de passe différents",
    path: ["confirm"],
  });
