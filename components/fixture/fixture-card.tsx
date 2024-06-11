"use client";

import { FixtureWithTeams } from "@/queries/fixture";
import { format } from "date-fns";
import { useState } from "react";
import { RiArrowDownWideFill } from "react-icons/ri";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

const FixtureCard = ({ fixture }: { fixture: FixtureWithTeams }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <>
      <Card>
        <CardHeader
          className="cursor-pointer pb-0"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <CardTitle className="pb-0">
            <div className="flex justify-between items-center">
              <span className="font-bold text-primary">Equipe A</span>
              <div>
                <span
                  className={`${
                    fixture.homeScore > fixture.awayScore
                      ? "text-green-600 font-bold"
                      : "font-normal"
                  }`}
                >
                  {fixture.homeScore}
                </span>
                <span className="mx-2"> - </span>
                <span
                  className={`${
                    fixture.homeScore < fixture.awayScore
                      ? "text-green-600 font-bold"
                      : "font-normal"
                  }`}
                >
                  {fixture.awayScore}
                </span>
              </div>
              <span className="font-bold text-destructive">Equipe B</span>
            </div>
          </CardTitle>
          <CardDescription>
            <span className="block w-full text-center">
              {format(fixture.datetime.toString(), "dd/MM/yyyy")}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent
          className={`pb-0 transition-all duration-300 ease ${
            isExpanded ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {isExpanded && (
            <div className="flex w-full">
              <div className="flex-1 text-left">
                {fixture.homeTeam.users.map((user) => (
                  <p key={user.id}>{user.username}</p>
                ))}
              </div>
              <div className="flex-1 text-right">
                {fixture.awayTeam.users.map((user) => (
                  <p key={user.id}>{user.username}</p>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="justify-center pb-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <RiArrowDownWideFill
              className={`w-7 h-7 transition-all text-muted-foreground duration-500 ${
                isExpanded ? "rotate-180" : "rotate-0"
              }`}
            />
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default FixtureCard;
