"use client";

import { useAppStore } from "@/store/store-bis";
import { useEffect } from "react";

export default function LogoutButton() {
  const logout = useAppStore((state) => state.logout);

  // hydrate persisted store after on mount
  useEffect(() => {
    useAppStore.persist.rehydrate();
  }, []);

  const handleOnClick = () => {
    logout();
  };

  return (
    <button type="submit" onClick={handleOnClick}>
      Déconnexion
    </button>
  );
}
