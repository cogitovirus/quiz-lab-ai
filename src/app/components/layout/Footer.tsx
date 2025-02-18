// src/app/components/layout/Footer.tsx
import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 py-4 px-6 mt-auto">
      <p className="text-center text-sm text-gray-500">
        {new Date().getFullYear()} cogitovirus.com | MIT license
      </p>
    </footer>
  );
}
