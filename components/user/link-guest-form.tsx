"use client";

import { linkGuest } from "@/actions/link-guest";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GuestUser } from "@/queries/user";
import { LinkGuestSchema } from "@/schemas";
import { useRouter } from "next/navigation";
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

const LinkGuestForm = ({ guestUsers }: { guestUsers: GuestUser[] }) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();
  const form = useZodForm({
    schema: LinkGuestSchema,
    defaultValues: {
      guestId: "",
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LinkGuestSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const { error, success } = await linkGuest(values);
      setError(error);
      setSuccess(success);

      if (error) {
        toast({
          variant: "destructive",
          title:
            "Erreur lors de la conversion du compte invité en compte classique",
        });
      }

      if (success) {
        toast({
          title: "Email envoyé pour la configuration du mot de passe",
        });
        router.push("/players");
        router.refresh();
      }
    });
  };

  return (
    <CardWrapper headerLabel="Créer un compte pour un·e invité·e">
      <Form form={form} onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="guestId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selectionner un·e invité·e" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {guestUsers.map((guestUser) => (
                      <SelectItem key={guestUser.id} value={guestUser.id}>
                        {guestUser.username}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
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
          Créer un compte
        </Button>
      </Form>
    </CardWrapper>
  );
};

export default LinkGuestForm;
