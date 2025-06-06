import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme} className='relative cursor-pointer'>
      <Sun
        className={`h-[1.2rem] w-[1.2rem] ${
          theme === 'light' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'
        } transition-all`}
      />
      <Moon
        className={`absolute h-[1.2rem] w-[1.2rem] ${
          theme === 'dark' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'
        } transition-all`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;