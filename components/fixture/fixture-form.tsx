"use client";

import { UserWithSquadsIds } from "@/queries/user";
import { useAppStore } from "@/store/store-bis";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";
import TeamCard from "../team/team-card";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { DataTable } from "../ui/data-table";
import { DatePicker } from "../ui/datepicker";
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

type DataTableRow = {
  id: string;
  username: string;
};

const formSchema = z.object({
  matchDate: z.date(),
  homeUserIds: z.string().array().min(4),
  awayUserIds: z.string().array().min(4),
  homeScore: z.coerce.number().min(0),
  awayScore: z.coerce.number().min(0),
});

type FixtureFormValues = z.infer<typeof formSchema>;
export type FixtureCreateValues = FixtureFormValues & { squadId: string };

type FixtureFormProps = {
  users: UserWithSquadsIds[];
  onSubmit: (values: FixtureCreateValues) => Promise<string>;
};

export const FixtureForm = ({ users, onSubmit }: FixtureFormProps) => {
  const [homeUsers, setHomeUsers] = useState<UserWithSquadsIds[]>([]);
  const [awayUsers, setAwayUsers] = useState<UserWithSquadsIds[]>([]);
  const [tableUsers, setTableUsers] = useState<UserWithSquadsIds[]>(users);
  const user = useAppStore((state) => state.user);
  const squadId = user?.targetedSquad?.id;

  const router = useRouter();
  const { toast } = useToast();

  const form = useZodForm({
    schema: formSchema,
    defaultValues: {
      matchDate: undefined,
      homeUserIds: [],
      awayUserIds: [],
      homeScore: 0,
      awayScore: 0,
    },
  });

  // hydrate persisted store after on mount
  useEffect(() => {
    useAppStore.persist.rehydrate();
  }, []);

  const addHomeUser = (user: UserWithSquadsIds) => {
    setHomeUsers([...homeUsers, user]);
    setTableUsers(tableUsers.filter((u) => u.id !== user.id));
    form.setValue("homeUserIds", [...form.getValues("homeUserIds"), user.id], {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const addAwayUser = (user: UserWithSquadsIds) => {
    setAwayUsers([...awayUsers, user]);
    setTableUsers(tableUsers.filter((u) => u.id !== user.id));
    form.setValue("awayUserIds", [...form.getValues("awayUserIds"), user.id], {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const removeHomeUser = (user: UserWithSquadsIds) => {
    setHomeUsers(homeUsers.filter((u) => u.id !== user.id));
    setTableUsers([...tableUsers, user]);
    form.setValue(
      "homeUserIds",
      form.getValues("homeUserIds").filter((id) => id !== user.id),
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );
  };

  const removeAwayUser = (user: UserWithSquadsIds) => {
    setAwayUsers(awayUsers.filter((u) => u.id !== user.id));
    setTableUsers([...tableUsers, user]);
    form.setValue(
      "awayUserIds",
      form.getValues("awayUserIds").filter((id) => id !== user.id),
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );
  };

  const columns: ColumnDef<DataTableRow>[] = [
    {
      accessorKey: "username",
      header: "Joueur·euse",
    },
    {
      accessorKey: "id",
      header: "Choix équipe",
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <Button
              className="text-primary"
              type="button"
              variant={"outline"}
              onClick={() => {
                const userId = row.original.id;
                const user = users.find((u) => u.id === userId);
                if (user) {
                  addHomeUser(user);
                }
              }}
            >
              Equipe A
            </Button>
            <Button
              className="text-destructive"
              type="button"
              variant={"outline"}
              onClick={() => {
                const userId = row.original.id;
                const user = users.find((u) => u.id === userId);

                if (user) {
                  addAwayUser(user);
                }
              }}
            >
              Equipe B
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Form
      form={form}
      onSubmit={async (values) => {
        if (!squadId) {
          toast({
            title:
              "Erreur de récupération des données de l'équipe : impossible de créer le match",
            variant: "destructive",
          });
        } else {
          await onSubmit({ ...values, squadId });
          toast({
            title: "Le match a bien été créé",
          });

          if (squadId) {
            router.push(`/squads/${squadId}/fixtures`);
          }
          router.refresh();
        }
      }}
    >
      <div className="space-y-8">
        <FormField
          control={form.control}
          name="matchDate"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className="inline-block mr-2 mb-2">
                Date du match
              </FormLabel>
              <FormControl className="inline-block">
                <DatePicker field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <div className="text-sm mb-4">
            <span className="inline-block font-medium mr-1">
              Composition des équipes
            </span>
            <span className="inline-block font-light">
              (au moins 4 joueur·euse·s)
            </span>
          </div>
          <DataTable columns={columns} data={tableUsers} />
        </div>
        <div className="flex gap-4 justify-between max-sm:flex-col">
          <div className="flex-1">
            <TeamCard
              type="home"
              users={homeUsers}
              removeUser={removeHomeUser}
            />
          </div>
          <div className="flex-1">
            <TeamCard
              type="away"
              users={awayUsers}
              removeUser={removeAwayUser}
            />
          </div>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="font-bold text-primary">Equipe A</div>
                <div className="flex items-center">
                  <FormField
                    control={form.control}
                    name="homeScore"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            {...field}
                            className="w-[50px] text-center border border-primary"
                            value=""
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <span className="mx-2"> - </span>
                  <FormField
                    control={form.control}
                    name="awayScore"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            {...field}
                            className="w-[50px] text-center border border-destructive"
                            value=""
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="font-bold text-destructive">Equipe B</div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-center py-4">
          <Button
            className="w-[50%]"
            type="submit"
            disabled={!form.formState.isValid}
          >
            Valider
          </Button>
        </div>
      </div>
    </Form>
  );
};
