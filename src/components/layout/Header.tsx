import { motion } from "framer-motion";
import ThemeToggle from "../theme-toggle";
const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full  z-50 p-4 bg-background text-foreground shadow-sm border-b dark:border-gray-700">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img
            className="w-10 h-auto mr-3"
            src="/to-do-list.png"
            alt="Todos Lists Logo"
          />
          <h1 className="text-2xl font-bold">Todos Lists</h1>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <ThemeToggle />
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
