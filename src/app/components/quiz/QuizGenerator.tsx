"use client";

import React, { useState } from 'react';
import { useQuizContext } from '../../lib/contexts/QuizContext';
import QuizControls from './QuizControls';
import ShortcutHints from './ShortcutHints';

export default function QuizGenerator() {
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

  const handleGenerate = async () => {
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
  };

  const handleRegenerate = () => {
    handleGenerate();
  };

  // const handleRedo = () => {
  //   setQuizStarted(false);
  //   setQuestions([]);
  // };

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
      />

      <div className="mt-4">
        <ShortcutHints />
      </div>
    </div>
  );
}

