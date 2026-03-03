import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './ui/button';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="rounded-full w-9 h-9 p-0 text-black hover:bg-black/10 hover:text-black"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="text-black" size={18} />
      ) : (
        <Sun className="text-black" size={18} />
      )}
    </Button>
  );
}
