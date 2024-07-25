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
    message: "Entre un prénom",
  }),
  lastname: z.string().min(1, {
    message: "Entre un nom",
  }),
});

export const CreateGuestSchema = z.object({
  firstname: z.string().min(1, {
    message: "Entre un prénom",
  }),
  lastname: z.string().min(1, {
    message: "Entre un nom",
  }),
});

export const LinkGuestSchema = z.object({
  guestId: z.string().cuid({
    message: "Sélectionne un·e invité·e",
  }),
  email: z.string().email({
    message: "Email requis",
  }),
});

export const AddUserSchema = z.object({
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

export const SettingsSchema = z.object({
  firstname: z.string().min(1, {
    message: "Entre un prénom",
  }),
  lastname: z.string().min(1, {
    message: "Entre un nom",
  }),
  username: z.string().min(1, {
    message: "Entre un nom",
  }),
});
