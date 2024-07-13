"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "./ui/button";

const RefreshRouteButton = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <Button disabled={isPending} onClick={() => handleClick()}>
      Actualiser
    </Button>
  );
};

export default RefreshRouteButton;
