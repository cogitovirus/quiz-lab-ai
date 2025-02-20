"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useQuizContext } from '../../lib/contexts/QuizContext';
import QuizControls from './QuizControls';
import ShortcutHints from './ShortcutHints';

export default function QuizGenerator({ isActive }: { isActive: boolean }) {
  const {
    setQuizStarted,
    setIsLoading,
    setQuestions,
    setCurrentQuestionIndex,
    setIsFinished,
    setScore,
  } = useQuizContext();

  const [prompt, setPrompt] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState('easy');
  const inputRef = useRef<HTMLInputElement>(null);

  // Ensure `handleGenerate` is stable across renders
  const handleGenerate = useCallback(async () => {
    if (!prompt) return;

    setQuizStarted(true);
    setIsLoading(true);
    setIsFinished(false);
    setScore(0);
    setQuestions([]); // clear previous data
    setCurrentQuestionIndex(0);

    const config = { prompt, numQuestions, difficulty };
    const response = await fetch('/api/quiz/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    });

    const generatedQuestions = await response.json();
    setQuestions(generatedQuestions);
    setIsLoading(false);
  }, [prompt, numQuestions, difficulty, setQuizStarted, setIsLoading, setIsFinished, setScore, setQuestions, setCurrentQuestionIndex]);

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isActive) return;

      const isCtrlOrMeta = event.ctrlKey || event.metaKey;

      if (isCtrlOrMeta && event.key === 'ArrowLeft') {
        setNumQuestions((prev) => Math.max(prev - 1, 1));
      } else if (isCtrlOrMeta && event.key === 'ArrowRight') {
        setNumQuestions((prev) => Math.min(prev + 1, 50));
      } else if (isCtrlOrMeta && event.key === 'ArrowUp') {
        setDifficulty((prev) => (prev === 'easy' ? 'medium' : prev === 'medium' ? 'hard' : 'hard'));
      } else if (isCtrlOrMeta && event.key === 'ArrowDown') {
        setDifficulty((prev) => (prev === 'hard' ? 'medium' : prev === 'medium' ? 'easy' : 'easy'));
      } else if (event.key === 'Enter') {
        handleGenerate();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive, handleGenerate]);

  const handleRegenerate = () => {
    handleGenerate();
  };

  return (
    <div className="bg-white rounded-md shadow p-4 flex flex-col h-full justify-between">
      <QuizControls
        prompt={prompt}
        onPromptChange={setPrompt}
        onGenerate={handleGenerate}
        onRegenerate={handleRegenerate}
        numQuestions={numQuestions}
        onNumQuestionsChange={setNumQuestions}
        difficulty={difficulty}
        onDifficultyChange={setDifficulty}
        inputRef={inputRef}
      />

      <div className="mt-4">
        <ShortcutHints />
      </div>
    </div>
  );
}
