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
      className="rounded-full w-9 h-9 p-0 text-gray-700 dark:text-gray-200 hover:bg-black/10 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="text-gray-700" size={18} />
      ) : (
        <Sun className="text-yellow-400" size={18} />
      )}
    </Button>
  );
}
