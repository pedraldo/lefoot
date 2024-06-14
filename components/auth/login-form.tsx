"use client";

import { login } from "@/actions/login";
import { LoginSchema } from "@/schemas";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { z } from "zod";
import FormError from "../form/form-error";
import FormSuccess from "../form/form-success";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "../ui/form";
import { Input } from "../ui/input";
import CardWrapper from "./card-wrapper";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already used by another provider"
      : "";

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useZodForm({
    schema: LoginSchema,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const { error, success } = await login(values);
      setError(error);
      setSuccess(success);
    });
  };

  return (
    <CardWrapper
      headerLabel="Bienvenue"
      backButtonLabel="Pas encore de compte ?"
      backButtonHref="/auth/register"
    >
      <Form form={form} onSubmit={onSubmit}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="john.doe@example.com"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="******"
                    type="password"
                  />
                </FormControl>
                <Button
                  variant="link"
                  className="px-0 font-normal"
                  size="sm"
                  asChild
                >
                  <Link href="/auth/reset">Mot de passe oublié ?</Link>
                </Button>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormError message={error || urlError} />
        <FormSuccess message={success} />
        <Button type="submit" className="w-full" disabled={isPending}>
          Connexion
        </Button>
      </Form>
    </CardWrapper>
  );
}
