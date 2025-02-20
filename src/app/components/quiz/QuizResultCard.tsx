import React from 'react';
import PrimaryButton from '../ui/PrimaryButton';

interface QuizResultCardProps {
  score: number;
  total: number;
  onRedo: () => void;
}

export default function QuizResultCard({ score, total, onRedo }: QuizResultCardProps) {
  return (
    <div className="bg-white rounded-md flex flex-col items-center">
      <h2>Quiz Results</h2>
      <p className="text-gray-700 mb-4">
        You scored {score} out of {total}.
      </p>
      <PrimaryButton onClick={onRedo}>Reset</PrimaryButton>
    </div>
  );
}