import ThemeToggle from "../Theme-toggle";

const Header = () => {
  return (
    <header className="bg-background text-foreground shadow-sm p-4 border-b dark:border-gray-700">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img
            className="w-10 h-auto mr-3"
            src="/to-do-list.png"
            alt="Todos Lists Logo"
          />
          <h1 className="text-2xl font-bold">
            Todos Lists
          </h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;