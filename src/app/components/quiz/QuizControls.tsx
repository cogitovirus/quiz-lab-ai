import React from 'react';
import PrimaryButton from '../ui/PrimaryButton';
import SecondaryButton from '../ui/SecondaryButton';

interface QuizControlsProps {
  prompt: string;
  onPromptChange: (val: string) => void;
  onGenerate: () => void;
  onReset: () => void;
  numQuestions: number;
  onNumQuestionsChange: (val: number) => void;
  difficulty: string;
  onDifficultyChange: (val: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export default function QuizControls({
  prompt,
  onPromptChange,
  onGenerate,
  onReset,
  numQuestions,
  onNumQuestionsChange,
  difficulty,
  onDifficultyChange,
  inputRef,
}: QuizControlsProps) {
  return (
    <div className="space-y-4">
      <input
        type="text"
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        placeholder="Enter quiz topic..."
        className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        ref={inputRef}
        id="quiz-generator-input"
        autoComplete="off"
      />

      <div className="flex items-center justify-between gap-2">
        <PrimaryButton onClick={onGenerate}>Generate</PrimaryButton>
        <div className="flex flex-col gap-2">
          <SecondaryButton
            onClick={onReset}
          >
            Reset
          </SecondaryButton>
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="numQuestions" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Number of Questions:
        </label>
        <input
          type="range"
          id="numQuestions"
          min="1"
          max="50"
          value={numQuestions}
          onChange={(e) => onNumQuestionsChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
        />
        <span className="block text-sm text-gray-500 dark:text-gray-400">{numQuestions}</span>
      </div>

      <div className="mt-4">
        <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Difficulty:
        </label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => onDifficultyChange(e.target.value)}
          className="block w-full mt-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-gray-100"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
    </div>
  );
}