"use client";

import { useAppStore } from "@/store/store-bis";
import { useEffect } from "react";

const SquadTitle = ({ subtitle }: { subtitle?: string }) => {
  const user = useAppStore((state) => state.user);

  // hydrate persisted store after on mount
  useEffect(() => {
    useAppStore.persist.rehydrate();
  }, []);

  if (!user?.targetedSquad?.name) {
    return null;
  }

  const squad = user.targetedSquad;

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold">{squad.name}</h1>
      <span className="text-sm">{subtitle}</span>
    </div>
  );
};

export default SquadTitle;
