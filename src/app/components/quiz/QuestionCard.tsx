"use client";

import React, { useEffect, useState } from "react";
import { QuizQuestion } from "../../lib/types/quiz";
import PrimaryButton from "../ui/PrimaryButton";

interface QuestionCardProps {
  question: QuizQuestion;
  onNext: (wasCorrect: boolean) => void;
  isActive: boolean;
  currentQuestionIndex: number;
  totalQuestions: number;
}

export default function QuestionCard({
  question,
  onNext,
  isActive,
  currentQuestionIndex,
  totalQuestions,
}: QuestionCardProps) {
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") {
        setSelectedAnswerIndex((prev) =>
          prev === null ? 0 : Math.max(prev - 1, 0)
        );
      } else if (event.key === "ArrowDown") {
        setSelectedAnswerIndex((prev) =>
          prev === null ? 0 : Math.min(prev + 1, question.answers.length - 1)
        );
      } else if (event.key === "Enter") {
        if (selectedAnswerIndex !== null && !submitted) {
          handleSubmit();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isActive, selectedAnswerIndex, submitted]);

  useEffect(() => {
    // Reset state when the current question index changes
    setSelectedAnswerIndex(null);
    setSubmitted(false);
    setShowExplanation(false);
  }, [currentQuestionIndex]);

  const handleSubmit = () => {
    if (selectedAnswerIndex === null || submitted) return;

    setSubmitted(true);

    const correctAnswer = question.answers.find((answer) => answer.isCorrect)?.text;
    const wasCorrect = question.answers[selectedAnswerIndex].text === correctAnswer;
    setShowExplanation(true);

    setTimeout(() => {
      setShowExplanation(false);
      setSubmitted(false);
      onNext(wasCorrect);
    }, 2000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl flex flex-col w-full max-w-2xl mx-auto p-6">
      {/* Question */}
      <h2 className="text-gray-900 dark:text-gray-100 text-xl font-semibold mb-6 text-center">
        {question.question}
      </h2>

      {/* Answer List */}
      <ul className="space-y-3">
        {question.answers.map((answer, i) => (
          <li
            key={i}
            className={`p-3 rounded-lg cursor-pointer transition-all duration-200 flex items-center
              border border-gray-300 dark:border-gray-700 
              ${
                submitted
                  ? answer.isCorrect
                    ? "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-300 border-green-400 dark:border-green-500 font-semibold"
                    : selectedAnswerIndex === i
                    ? "bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-300 border-red-400 dark:border-red-500 font-semibold"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  : selectedAnswerIndex === i
                  ? "bg-blue-100 dark:bg-blue-700 border-blue-500 dark:border-blue-400"
                  : "bg-transparent text-gray-900 dark:text-gray-100"
              }`}
          >
            <label className="flex items-center w-full cursor-pointer">
              <input
                type="radio"
                name={question.id}
                value={answer.text}
                checked={selectedAnswerIndex === i}
                onChange={() => setSelectedAnswerIndex(i)}
                className="hidden"
                disabled={submitted}
              />
              <span className="ml-2">{answer.text}</span>
            </label>
          </li>
        ))}
      </ul>

      {/* Explanation */}
      {showExplanation && (
        <p className="text-gray-700 dark:text-gray-300 mt-6 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-center">
          <strong>Explanation:</strong> {question.explanation}
        </p>
      )}

      {/* Submit Button */}
      <div className="flex justify-center mt-6">
        <PrimaryButton
          onClick={handleSubmit}
          disabled={selectedAnswerIndex === null || submitted}
          className="w-full"
        >
          Submit
        </PrimaryButton>
      </div>

      {/* Question Counter */}
      <p className="text-gray-500 dark:text-gray-400 mt-6 text-center">
        Question {currentQuestionIndex + 1} of {totalQuestions}
      </p>
    </div>
  );
}