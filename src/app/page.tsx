// src/app/page.tsx
import React from 'react';
import Input from './components/ui/Input';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-100">
        Quiz Lab AI
      </h1>
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <p className="text-lg text-gray-300 text-center">
          AI-powered interactive quiz generator for studying and exam preparation.
        </p>
        <Input />
      </div>
    </div>
  )
}