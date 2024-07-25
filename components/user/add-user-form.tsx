"use client";

import { addUser } from "@/actions/add-user";
import { AddUserSchema } from "@/schemas";
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

export type AddUserValues = z.infer<typeof AddUserSchema> & { squadId: string };

const AddUserForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();
  const user = useAppStore((state) => state.user);
  const squadId = user?.targetedSquad?.id;
  const form = useZodForm({
    schema: AddUserSchema,
    defaultValues: {
      email: "",
    },
  });

  // hydrate persisted store after on mount
  useEffect(() => {
    useAppStore.persist.rehydrate();
  }, []);

  const onSubmit = (values: z.infer<typeof AddUserSchema>) => {
    if (!squadId) {
      toast({
        variant: "destructive",
        title:
          "Erreur lors de la récupération des données de l'equipe : impossible d'ajouter un·e joueur·euse",
      });
    } else {
      setError("");
      setSuccess("");

      startTransition(async () => {
        const { error, success } = await addUser({ ...values, squadId });
        setError(error);
        setSuccess(success);

        if (error) {
          toast({
            variant: "destructive",
            title: error,
          });
        }

        if (success) {
          toast({
            title: success,
          });

          if (user) {
            router.push(`/squads/${squadId}/players`);
          }
          router.refresh();
        }
      });
    }
  };

  return (
    <CardWrapper headerLabel="Ajouter un·e joueur·euse à l'équipe">
      <Form form={form} onSubmit={onSubmit} className="space-y-6">
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
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button type="submit" className="w-full" disabled={isPending}>
          Ajouter
        </Button>
      </Form>
    </CardWrapper>
  );
};

export default AddUserForm;
