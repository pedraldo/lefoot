"use client";

import { useAppStore } from "@/store/store-bis";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { RiArrowRightLine } from "react-icons/ri";
import { Button } from "../ui/button";

const SquadLink = ({
  squad,
  beforeRedirection,
}: {
  squad: { id: string; name: string };
  beforeRedirection: (squadId: string) => Promise<void>;
}) => {
  const router = useRouter();
  const storeUpdateTargetedSquad = useAppStore(
    (state) => state.updateTargetedSquad
  );

  // hydrate persisted store after on mount
  useEffect(() => {
    useAppStore.persist.rehydrate();
  }, []);

  return (
    <Button
      onClick={async () => {
        storeUpdateTargetedSquad(squad);
        await beforeRedirection(squad.id);
        router.push(`/squads/${squad.id}/fixtures`);
      }}
    >
      {squad.name} <RiArrowRightLine className="ml-2 h-5 w-5" />
    </Button>
  );
};

export default SquadLink;
