import React from 'react';
import PrimaryButton from '../ui/PrimaryButton';

interface QuizControlsProps {
  prompt: string;
  onPromptChange: (val: string) => void;
  onGenerate: () => void;
  onRegenerate: () => void;
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
  onRegenerate,
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
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        ref={inputRef}
      />

      <div className="flex items-center gap-2">
        <PrimaryButton onClick={onGenerate}>Generate</PrimaryButton>
        <button
          onClick={onRegenerate}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Regenerate
        </button>
        {/* Additional config button if needed */}
      </div>

      <div className="mt-4">
        <label htmlFor="numQuestions" className="block text-sm font-medium text-gray-700">
          Number of Questions:
        </label>
        <input
          type="range"
          id="numQuestions"
          min="1"
          max="50"
          value={numQuestions}
          onChange={(e) => onNumQuestionsChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <span className="block text-sm text-gray-500">{numQuestions}</span>
      </div>

      <div className="mt-4">
        <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
          Difficulty:
        </label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => onDifficultyChange(e.target.value)}
          className="block w-full mt-1 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
    </div>
  );
}