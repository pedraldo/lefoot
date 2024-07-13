"use client";

import { useAppStore } from "@/store/store-bis";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AppInitializer = () => {
  const user = useAppStore((state) => state.user);
  const router = useRouter();
  console.log("APP INITIALIZER user", JSON.stringify(user));

  // useEffect to prevent error
  // Cannot update a component (`Router`) while rendering a different component (`AppInitializer`)
  useEffect(() => {
    if (user) {
      if (user.targetedSquad?.id) {
        console.log("redirect to fixtures");
        router.push(`/squads/${user.targetedSquad.id}/fixtures`);
      } else {
        console.log("User connected without squad");
        router.push(`/squads`);
      }
    } else {
      console.log("redirect to login");
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
