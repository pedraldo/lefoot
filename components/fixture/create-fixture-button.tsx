"use client";

import Link from "next/link";
import { RiAddFill } from "react-icons/ri";
import { useAppStore } from "@/store/store-bis";
import { Button, buttonVariants } from "@/components/ui/button";
import { useEffect } from "react";

const CreateFixtureButton = () => {
  const user = useAppStore((state) => state.user);
  const squadId = user?.targetedSquad?.id;

  // hydrate persisted store after on mount
  useEffect(() => {
    useAppStore.persist.rehydrate();
  }, []);

  if (!user || !squadId) {
    return (
      <Button variant={"default"} disabled>
        <RiAddFill className="mr-2 h-4 w-4" /> Créer un match
      </Button>
    );
  }

  return (
    <Link
      href={`/squads/${squadId}/fixtures/create`}
      className={buttonVariants({ variant: "default" })}
    >
      <RiAddFill className="mr-2 h-4 w-4" /> Créer un match
    </Link>
  );
};

export default CreateFixtureButton;
