import React from 'react';
import { ListChecks } from 'lucide-react'; 

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm p-4 border-b dark:border-gray-700">
      <div className="container mx-auto flex items-center">
        <ListChecks className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Todos Lists
        </h1>
      </div>
    </header>
  );
};

export default Header;