"use client";

import { createGuest } from "@/actions/create-guest";
import { CreateGuestSchema } from "@/schemas";
import { useAppStore } from "@/store/store-bis";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
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

export type CreateGuestValues = z.infer<typeof CreateGuestSchema> & {
  squadId: string;
};

const CreateGuestForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const squadId = useAppStore((state) => state.user)?.targetedSquad?.id;

  // hydrate persisted store after on mount
  useEffect(() => {
    useAppStore.persist.rehydrate();
  }, []);

  const form = useZodForm({
    schema: CreateGuestSchema,
    defaultValues: {
      firstname: "",
      lastname: "",
    },
  });

  const { toast } = useToast();
  const router = useRouter();

  if (!squadId) {
    return (
      <div className="flex flex-col gap-2 w-full text-center">
        <p>{`Erreur lors de la récupération d'informations nécessaires à l'invitation
        d'un·e joueur·euse.`}</p>
        <p>{`L'équipe est probablement inconnue.`}</p>
      </div>
    );
  }

  const onSubmit = (values: z.infer<typeof CreateGuestSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const { error, success } = await createGuest({ ...values, squadId });
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

        if (squadId) {
          router.push(`/squads/${squadId}/players`);
        }
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

export default CreateGuestForm;
