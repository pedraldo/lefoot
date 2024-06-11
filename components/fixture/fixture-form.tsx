"use client";

import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import TeamCard from "../team-card";
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

export type FixtureFormValues = z.infer<typeof formSchema>;

type FixtureFormProps = {
  users: User[];
  onSubmit: (values: FixtureFormValues) => Promise<string>;
};

export const FixtureForm = ({ users, onSubmit }: FixtureFormProps) => {
  const [homeUsers, setHomeUsers] = useState<User[]>([]);
  const [awayUsers, setAwayUsers] = useState<User[]>([]);
  const [tableUsers, setTableUsers] = useState<User[]>(users);
  const router = useRouter();

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

  const addHomeUser = (user: User) => {
    setHomeUsers([...homeUsers, user]);
    setTableUsers(tableUsers.filter((u) => u.id !== user.id));
    form.setValue("homeUserIds", [...form.getValues("homeUserIds"), user.id], {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const addAwayUser = (user: User) => {
    setAwayUsers([...awayUsers, user]);
    setTableUsers(tableUsers.filter((u) => u.id !== user.id));
    form.setValue("awayUserIds", [...form.getValues("awayUserIds"), user.id], {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const removeHomeUser = (user: User) => {
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

  const removeAwayUser = (user: User) => {
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
      header: "Joueur",
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
        await onSubmit(values);
        router.push(`/fixtures`);
        router.refresh();
      }}
    >
      <div className="space-y-8">
        <FormField
          control={form.control}
          name="matchDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date du match</FormLabel>
              <FormControl>
                <DatePicker field={field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <div className="text-sm font-medium mb-4">
            Composition des équipes (au moins 4 joueurs)
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
                            className="w-[60px]"
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
                            className="w-[60px]"
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
