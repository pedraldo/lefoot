"use client";

import { inviteUser } from "@/actions/invite-user";
import { InviteUserSchema } from "@/schemas";
import { useState, useTransition } from "react";
import { z } from "zod";
import CardWrapper from "../auth/card-wrapper";
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
import { useRouter } from "next/navigation";

const InviteForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useZodForm({
    schema: InviteUserSchema,
    defaultValues: {
      firstname: "",
      lastname: "",
    },
  });

  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = (values: z.infer<typeof InviteUserSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const { error, success } = await inviteUser(values);
      setError(error);
      setSuccess(success);

      if (error) {
        toast({
          variant: "destructive",
          title: "Erreur lors de la création du compte invité",
        });
      }

      if (success) {
        toast({
          title: "Compte invité créé",
        });
        router.push("/players");
        router.refresh();
      }
    });
  };

  return (
    <CardWrapper headerLabel="Créer un·e invité·e">
      <Form form={form} onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} placeholder="John" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} placeholder="Doe" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button type="submit" className="w-full" disabled={isPending}>
          Créer un·e invité·e
        </Button>
      </Form>
    </CardWrapper>
  );
};

export default InviteForm;
