import { User } from "@prisma/client";
import { LuX } from "react-icons/lu";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const TeamCard = ({
  type,
  users,
  removeUser,
}: {
  type: "home" | "away";
  users: User[];
  removeUser?: (user: User) => void;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-1 justify-between">
            {type === "home" && <span className="text-primary">Equipe A</span>}
            {type === "away" && (
              <span className="text-destructive">Equipe B</span>
            )}
            <span className="text-muted-foreground font-normal">
              {users.length}
            </span>
          </div>
        </CardTitle>
        <CardDescription>{"Equipe d'au moins 4 joueurs"}</CardDescription>
      </CardHeader>
      <CardContent>
        {users.map((user) => (
          <div className="flex justify-between gap-1" key={user.id}>
            <span className="flex-1">{user.username}</span>
            {!!removeUser && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  removeUser(user);
                }}
              >
                <LuX className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TeamCard;
