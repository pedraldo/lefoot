"use client";

import { updateUser } from "@/actions/update-user";
import { Input } from "@/components/ui/input";
import { SettingsSchema } from "@/schemas";
import { useAppStore } from "@/store/store-bis";
import { useEffect, useMemo, useState, useTransition } from "react";
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
import { useToast } from "../ui/use-toast";

export type UpdateUserValues = z.infer<typeof SettingsSchema> & {
  id: string;
};

const UserSettingsForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const user = useAppStore((state) => state.user);
  const updateUserNames = useAppStore((state) => state.updateUserNames);

  // hydrate persisted store after on mount
  useEffect(() => {
    useAppStore.persist.rehydrate();
  }, []);

  const form = useZodForm({
    schema: SettingsSchema,
    defaultValues: useMemo(
      () => ({
        firstname: user?.firstname || "",
        lastname: user?.lastname || "",
        username: user?.username || "",
      }),
      [user]
    ),
    mode: "onChange",
  });
  const { isDirty, isValid } = form.formState;

  useEffect(() => {
    if (!user?.id) {
      setError(
        "Erreur lors de la récupération de tes informations utilisateur."
      );
    }
    setError("");

    form.reset({
      firstname: user?.firstname || "",
      lastname: user?.lastname || "",
      username: user?.username || "",
    });
  }, [form, user]);

  const { toast } = useToast();

  if (!user?.id) {
    return (
      <div className="flex flex-col gap-2 w-full text-center">
        <p>{`Chargement ...`}</p>
      </div>
    );
  }

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const { error, success } = await updateUser({ ...values, id: user.id });
      setError(error);
      setSuccess(success);

      if (error) {
        toast({
          variant: "destructive",
          title: "Erreur lors de la mise à jour de tes informations",
        });
      }

      if (success) {
        const { firstname, lastname, username } = values;
        updateUserNames(
          firstname || user?.firstname || "",
          lastname || user?.lastname || "",
          username || user?.username || ""
        );
        toast({
          title: "Tes infos ont bien été mises à jour !",
        });
      }
    });
  };

  return (
    <Form form={form} onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex gap-4 items-center max-sm:flex-col">
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
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Surnom</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isPending}
                  placeholder="Le nouveau Pelé"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormError message={error} />
      <FormSuccess message={success} />
      <Button
        type="submit"
        className="w-full"
        disabled={isPending || !isDirty || !isValid}
      >
        {isPending ? "Chargement ..." : "Mettre à jour mes infos"}
      </Button>
    </Form>
  );
};

export default UserSettingsForm;
