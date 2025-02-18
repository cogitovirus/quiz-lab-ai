// src/app/components/layout/Header.tsx
import React from 'react';

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto py-4 px-6">
        <h1 className="text-2xl font-bold text-gray-800">Quiz Lab AI v0.1</h1>
      </div>
    </header>
  );
}
