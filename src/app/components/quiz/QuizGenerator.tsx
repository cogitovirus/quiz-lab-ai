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
  const [numQuestions, setNumQuestions] = useState(15);
  const [difficulty, setDifficulty] = useState('easy');
  const inputRef = useRef<HTMLInputElement>(null);

  // Function to fetch questions in batches
  const fetchQuestionsInBatches = async (prompt: string, numQuestions: number, difficulty: string) => {
    const batchSize = 15; // Define the batch size
    const totalBatches = Math.ceil(numQuestions / batchSize);

    for (let i = 0; i < totalBatches; i++) {
      const batchConfig = {
        prompt,
        numQuestions: Math.min(batchSize, numQuestions - i * batchSize),
        difficulty,
      };

      const response = await fetch('/api/quiz/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(batchConfig),
      });

      const batchQuestions = await response.json();
      setQuestions((prevQuestions) => [...prevQuestions, ...batchQuestions]);

      if (i === 0) {
        setIsLoading(false); // Stop loading after the first batch
      }
    }
  };

  // Memoized handleGenerate to prevent unnecessary re-renders
  const handleGenerate = useCallback(async () => {
    if (!prompt) return;

    setQuizStarted(true);
    setIsLoading(true);
    setIsFinished(false);
    setScore(0);
    setQuestions([]); // Clear previous data
    setCurrentQuestionIndex(0);

    await fetchQuestionsInBatches(prompt, numQuestions, difficulty);
  }, [prompt, numQuestions, difficulty, setQuizStarted, setIsLoading, setIsFinished, setScore, setQuestions, setCurrentQuestionIndex]);

  // Memoized handleReset to prevent re-renders
  const handleReset = useCallback(() => {
    setQuizStarted(true);
    setIsLoading(false);
    setIsFinished(false);
    setScore(0);
    setCurrentQuestionIndex(0);
  }, [setQuizStarted, setIsLoading, setIsFinished, setScore, setCurrentQuestionIndex]);

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
        setNumQuestions((prev) => Math.min(prev + 1, 45));
      } else if (isCtrlOrMeta && event.key === 'ArrowUp') {
        setDifficulty((prev) => (prev === 'easy' ? 'medium' : prev === 'medium' ? 'hard' : 'hard'));
      } else if (isCtrlOrMeta && event.key === 'ArrowDown') {
        setDifficulty((prev) => (prev === 'hard' ? 'medium' : prev === 'medium' ? 'easy' : 'easy'));
      } else if (isCtrlOrMeta && event.shiftKey && event.key.toLowerCase() === 'x') {
        handleReset();
      } else if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission
        handleGenerate();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive, handleGenerate, handleReset]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-md shadow p-4 flex flex-col h-full w-full">
      <QuizControls
        prompt={prompt}
        onPromptChange={setPrompt}
        onGenerate={handleGenerate}
        onReset={handleReset}
        numQuestions={numQuestions}
        onNumQuestionsChange={setNumQuestions}
        difficulty={difficulty}
        onDifficultyChange={setDifficulty}
        inputRef={inputRef}
      />

      <div className="mt-auto">
        <ShortcutHints />
      </div>
    </div>
  );
}