"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { LuMoon, LuSunMedium } from "react-icons/lu";

export const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();
  return (
    <Button
      variant={"ghost"}
      size="sm"
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light");
      }}
    >
      <LuSunMedium
        size={20}
        className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <LuMoon
        size={20}
        className="absolute rotate-90 scale-0 transition-all dark:-rotate-0 dark:scale-100"
      />
      <span className="sr-only">Toggle Theme</span>
    </Button>
  );
};
