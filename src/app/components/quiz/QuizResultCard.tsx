import React, { useEffect, useState } from "react";
import SecondaryButton from "../ui/SecondaryButton";

interface QuizResultCardProps {
  score: number;
  total: number;
  onRedo: () => void;
}

const QuizResultCard: React.FC<QuizResultCardProps> = ({ score, total, onRedo }) => {
  const [showFireworks, setShowFireworks] = useState<boolean>(false);

  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  useEffect(() => {
    if (percentage >= 70) {
      setShowFireworks(true);
      const timer = setTimeout(() => setShowFireworks(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [percentage]);

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center justify-center w-full max-w-md mx-auto text-center transform -translate-y-1/2">
        {/* Fireworks Animation */}
        {showFireworks && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-32 h-32 bg-transparent animate-fireworks"></div>
          </div>
        )}

        {/* Animated Score Display */}
        <div
          className={`text-4xl font-bold transition-transform duration-700 ${
            percentage >= 70
              ? "text-green-500 animate-celebrate"
              : "text-red-500 animate-shake"
          }`}
        >
          {score} / {total}
        </div>

        {/* Score Message */}
        <p className="text-gray-700 dark:text-gray-300 text-lg mt-2">
          {percentage >= 70 ? "Amazing! You crushed it! 🎆" : "😢 Try again, you'll get there!"}
        </p>

        {/* Reset Button */}
        <SecondaryButton onClick={onRedo} className="mt-6">
          Reset
        </SecondaryButton>
      </div>
    </div>
  );
};

export default QuizResultCard;
