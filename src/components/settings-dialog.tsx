"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Settings, Sun, Moon, Monitor, Palette, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark" | "system";

const VALID_THEMES: Theme[] = ["light", "dark", "system"];

const THEME_OPTIONS: {
  value: Theme;
  label: string;
  icon: React.ElementType;
}[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

function toTheme(value: string | undefined): Theme {
  return VALID_THEMES.includes(value as Theme) ? (value as Theme) : "system";
}

export function SettingsDialog() {
  const { theme, setTheme } = useTheme();
  const activeTheme = toTheme(theme);
  const [selected, setSelected] = useState<Theme>(activeTheme);
  const isDirty = selected !== activeTheme;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon-sm">
          <Settings className="size-4" />
        </Button>
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay className="bg-black/50 backdrop-blur-sm" />
        <DialogContent
          aria-describedby={undefined}
          showCloseButton={false}
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
          className="w-[calc(100%-2rem)] max-w-md gap-0 overflow-hidden rounded-xl border border-border/60 p-0 shadow-xl"
        >
          <DialogHeader className="px-5 pt-5 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Settings className="size-4 text-primary" />
              </div>
              <div className="text-left leading-tight">
                <DialogTitle className="font-semibold text-sm leading-tight">
                  Platform Configuration
                </DialogTitle>
                <p className="mt-1 text-muted-foreground text-xs">
                  These changes are applied globally
                </p>
              </div>
            </div>
          </DialogHeader>

          <Separator />

          <div className="space-y-3 px-5 py-4">
            <div className="flex items-center gap-1.5">
              <Palette className="size-3.5 text-muted-foreground" />
              <span className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
                Appearance
              </span>
            </div>
            <ThemeToggleGroup selected={selected} onSelect={setSelected} />
          </div>

          <Separator />

          <DialogFooter className="flex flex-row items-center gap-2 bg-muted/20 px-5 py-3.5">
            <DialogClose asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelected(activeTheme)}
                className="flex-1 sm:flex-none"
              >
                Close
              </Button>
            </DialogClose>
            <Button
              size="sm"
              onClick={() => setTheme(selected)}
              disabled={!isDirty}
              className="flex-1 gap-1.5 sm:flex-none"
            >
              <Check className="size-3.5" />
              {isDirty ? "Save changes" : "No changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

function ThemeToggleGroup({
  selected,
  onSelect,
}: {
  selected: Theme;
  onSelect: (theme: Theme) => void;
}) {
  function handleChange(value: string) {
    if (VALID_THEMES.includes(value as Theme)) {
      onSelect(value as Theme);
    }
  }

  return (
    <ToggleGroup
      type="single"
      value={selected}
      onValueChange={handleChange}
      className="grid w-full grid-cols-3 gap-2"
    >
      {THEME_OPTIONS.map(({ value, label, icon: Icon }) => {
        const isActive = selected === value;
        return (
          <ToggleGroupItem
            key={value}
            value={value}
            className={cn(
              "relative flex h-auto flex-col items-center gap-2 rounded-lg border p-3 text-center transition-all",
              isActive
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-border/60 bg-muted/30 hover:border-border hover:bg-muted/60",
            )}
          >
            {isActive && (
              <span className="absolute top-1.5 right-1.5 flex size-3.5 items-center justify-center rounded-full bg-primary">
                <Check
                  className="size-2 text-primary-foreground"
                  strokeWidth={3}
                />
              </span>
            )}

            <div
              className={cn(
                "flex size-7 items-center justify-center rounded-md transition-colors",
                isActive
                  ? "bg-primary/15 text-primary"
                  : "bg-muted text-muted-foreground",
              )}
            >
              <Icon className="size-3.5" />
            </div>

            <p
              className={cn(
                "font-medium text-xs leading-tight",
                isActive ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {label}
            </p>
          </ToggleGroupItem>
        );
      })}
    </ToggleGroup>
  );
}
