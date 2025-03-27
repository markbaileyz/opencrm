
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { Toggle } from "@/components/ui/toggle";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  // Set theme to dark by default when component mounts
  useEffect(() => {
    setTheme("dark");
  }, []);

  return (
    <div className="flex items-center space-x-2">
      <Toggle
        aria-label="Toggle theme"
        className="p-2"
        pressed={theme === "light"}
        onPressedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5 text-yellow-300" />
        ) : (
          <Moon className="h-5 w-5 text-blue-700" />
        )}
      </Toggle>
    </div>
  );
}
