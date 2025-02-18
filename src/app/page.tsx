// src/app/page.tsx
import React from 'react';
import QuizGenerator from './components/quiz/QuizGenerator';
import QuizViewer from './components/quiz/QuizViewer';

export default function HomePage() {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-8 px-4 py-6 max-w-[1200px] mx-auto w-full">
      {/* Left Side */}
      <div className="flex flex-col md:w-1/2 space-y-4">
        <QuizGenerator />
      </div>
      {/* Right Side */}
      <div className="md:w-1/2">
        <QuizViewer />
      </div>
    </div>
  )
}