import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Password of 6 characters min. is required",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Password of 6 characters min. is required",
  }),
  firstname: z.string().min(1, {
    message: "First name is required",
  }),
  lastname: z.string().min(1, {
    message: "Last name is required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const NewPasswordSchema = z
  .object({
    password: z.string().min(6, {
      message: "Password of 6 characters min. is required",
    }),
    confirm: z.string().min(6, {
      message: "Password of 6 characters min. is required",
    }),
  })
  .refine(({ password, confirm }) => password === confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });
