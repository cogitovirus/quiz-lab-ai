import React from 'react';
import DarkModeToggle from './DarkModeToggle';

export default function Header() {
  return (
    <header className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto py-4 px-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Quiz Lab AI v0.3</h1>
        <div className="ml-auto">
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}