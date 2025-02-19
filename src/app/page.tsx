"use client"

import React, { useState, useEffect } from 'react';
import QuizGenerator from './components/quiz/QuizGenerator';
import QuizViewer from './components/quiz/QuizViewer';

export default function HomePage() {
  const [activeComponent, setActiveComponent] = useState<'generator' | 'viewer'>('generator');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        event.preventDefault();
        setActiveComponent((prev) => (prev === 'generator' ? 'viewer' : 'generator'));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-8 px-4 py-6 max-w-[1200px] mx-auto w-full flex-grow h-full">
      {/* Left Side */}
      <div className={`flex flex-col md:w-1/2 space-y-4 ${activeComponent === 'generator' ? 'border-2 border-blue-500' : ''} flex-grow`}>
        <QuizGenerator isActive={activeComponent === 'generator'} />
      </div>
      {/* Right Side */}
      <div className={`md:w-1/2 ${activeComponent === 'viewer' ? 'border-2 border-blue-500' : ''} flex-grow`}>
        <QuizViewer isActive={activeComponent === 'viewer'} />
      </div>
    </div>
  );
}