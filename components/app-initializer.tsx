"use client";

import { useAppStore } from "@/store/store-bis";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AppInitializer = () => {
  const user = useAppStore((state) => state.user);
  const router = useRouter();
  // useEffect to prevent error
  // Cannot update a component (`Router`) while rendering a different component (`AppInitializer`)
  useEffect(() => {
    if (user) {
      if (user.targetedSquad?.id) {
        router.push(`/squads/${user.targetedSquad.id}/fixtures`);
      } else {
        router.push(`/squads`);
      }
    } else {
      router.push("/auth/login");
    }
  }, [router, user]);

  // hydrate persisted store after on mount
  useEffect(() => {
    useAppStore.persist.rehydrate();
  }, []);

  return (
    user &&
    !user.targetedSquad?.id && (
      <div className="w-full h-full flex justify-center items-center">
        Chargement ...
      </div>
    )
  );
};

export default AppInitializer;
