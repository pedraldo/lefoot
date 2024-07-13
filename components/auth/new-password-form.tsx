"use client";

import { newPassword } from "@/actions/new-password";
import { NewPasswordSchema } from "@/schemas";
import { useRouter, useSearchParams } from "next/navigation";
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
import { useToast } from "../ui/use-toast";
import CardWrapper from "./card-wrapper";

export default function NewPasswordForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();

  const form = useZodForm({
    schema: NewPasswordSchema,
    defaultValues: {
      password: "",
      confirm: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    startTransition(async () => {
      const { error, success } = await newPassword(values, token);
      setError(error);
      setSuccess(success);

      if (success && !error) {
        toast({
          title: "Mot de passe mis à jour",
        });
        router.push("/auth/login");
      }

      if (error) {
        toast({
          title:
            "Erreur lors de la mise à jour du mot de passe (le lien est peut étre expiré)",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <CardWrapper
      headerLabel="Créer un nouveau mot de passe"
      backButtonLabel="Aller à la page de connexion"
      backButtonHref="/auth/login"
    >
      <Form form={form} onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-4">
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirme le mot de passe</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="******"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button type="submit" className="w-full" disabled={isPending}>
          Modifier le mot de passe
        </Button>
      </Form>
    </CardWrapper>
  );
}
