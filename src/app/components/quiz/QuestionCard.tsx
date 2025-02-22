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
        console.log("Enter pressed. Current selection:", selectedAnswerIndex);
        if (selectedAnswerIndex !== null && !submitted) {
          handleSubmit();
        } else {
          console.log("Enter ignored: No answer selected.");
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
    if (selectedAnswerIndex === null || submitted) {
      console.log("Submission blocked: No answer selected or already submitted.");
      return; // Prevent submission
    }
  
    setSubmitted(true);
  
    const correctAnswer = question.answers.find((answer) => answer.isCorrect)?.text;
    const wasCorrect = question.answers[selectedAnswerIndex].text === correctAnswer;
    setShowExplanation(true);
  
    console.log("Submitting answer:", question.answers[selectedAnswerIndex].text, "Correct:", wasCorrect);
  
    setTimeout(() => {
      setShowExplanation(false);
      setSubmitted(false);
      onNext(wasCorrect);
    }, 2000);
  };
  
  

  return (
    <div className="bg-white rounded-md flex flex-col items-center">
      <h2>{question.question}</h2>
      <ul>
        {question.answers.map((answer, i) => (
          <li
            key={i}
            className={`mb-2 cursor-pointer ${
              selectedAnswerIndex === i ? "bg-gray-200" : ""
            } ${submitted && answer.isCorrect ? "text-green-500" : 
               submitted && selectedAnswerIndex === i && !answer.isCorrect ? "text-red-500" : ""}`}
          >
            <label className="flex items-center">
              <input
                type="radio"
                name={question.id}
                value={answer.text}
                checked={selectedAnswerIndex === i}
                onChange={() => setSelectedAnswerIndex(i)}
                className="mr-2"
                disabled={submitted}
              />
              {answer.text}
            </label>
          </li>
        ))}
      </ul>
      {showExplanation && (
        <p className="text-gray-700 mt-4">
          <strong>Explanation:</strong> {question.explanation}
        </p>
      )}
      <PrimaryButton onClick={handleSubmit} disabled={selectedAnswerIndex === null || submitted}>
        Submit
      </PrimaryButton>

      <p className="text-gray-500 mb-4">
        Question {currentQuestionIndex + 1} of {totalQuestions}
      </p>
    </div>
  );
}