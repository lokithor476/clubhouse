"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

export function ModeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      variant="outline"
      size="icon-sm"
    >
      <Sun className="size-4 dark:hidden" />
      <Moon className="size-4 hidden dark:block" />
    </Button>
  );
}
