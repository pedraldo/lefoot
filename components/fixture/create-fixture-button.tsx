"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { useAppStore } from "@/store/store-bis";
import Link from "next/link";
import { useEffect } from "react";
import { RiAddFill } from "react-icons/ri";

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
        <RiAddFill className="mr-2 h-5 w-5" /> Créer
      </Button>
    );
  }

  return (
    <Link
      href={`/squads/${squadId}/fixtures/create`}
      className={buttonVariants({ variant: "default" })}
    >
      <RiAddFill className="mr-2 h-5 w-5" /> Créer
    </Link>
  );
};

export default CreateFixtureButton;
