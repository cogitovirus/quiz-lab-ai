"use client";

import React, { useEffect } from "react";
import { useQuizContext } from "../../lib/contexts/QuizContext";
import Spinner from "../ui/Spinner";
import QuestionCard from "./QuestionCard";
import QuizResultCard from "./QuizResultCard";

export default function QuizViewer({ isActive }: { isActive: boolean }) {
  const {
    quizStarted,
    isLoading,
    questions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    isFinished,
    setIsFinished,
    score,
    setScore,
    setQuizStarted,
    setQuestions,
  } = useQuizContext();

  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") {
        setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
      } else if (event.key === "ArrowDown") {
        setCurrentQuestionIndex((prev) =>
          Math.min(prev + 1, questions.length - 1)
        );
      } else if (event.key === "Enter") {
        // Submit the answer
        const currentQuestion = questions[currentQuestionIndex];
        const correctAnswer = currentQuestion.answers.find(
          (answer) => answer.isCorrect
        )?.text;
        const wasCorrect = currentQuestion.selectedAnswer === correctAnswer;
        setScore((prev) => (wasCorrect ? prev + 1 : prev));
        setCurrentQuestionIndex((prev) =>
          prev < questions.length - 1 ? prev + 1 : prev
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isActive, questions, currentQuestionIndex]);

  const handleNext = (wasCorrect: boolean) => {
    if (wasCorrect) setScore(score + 1);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  return (
    <div className="bg-white rounded-md shadow p-4 flex flex-col h-full">
      {quizStarted ? (
        isLoading ? (
          <div className="flex items-center justify-center flex-grow">
            <Spinner />
          </div>
        ) : isFinished ? (
          <div className="flex flex-col flex-grow">
            <QuizResultCard
              score={score}
              total={questions.length}
              onRedo={() => {
                setIsFinished(false);
                setQuizStarted(false);
                setCurrentQuestionIndex(0);
                setScore(0);
                setQuestions([]);
              }}
            />
          </div>
        ) : questions.length > 0 ? (
          <div className="flex flex-col flex-grow">
            <QuestionCard question={questions[currentQuestionIndex]} onNext={handleNext} />
          </div>
        ) : (
          <div className="flex flex-col flex-grow items-center justify-center">
            <p className="text-gray-500">No questions available.</p>
          </div>
        )
      ) : (
        <div className="flex flex-col flex-grow">
          <div className="flex-grow flex items-center justify-center">
            <p className="text-gray-500">Enter the topic to generate questions.</p>
          </div>
          <div className="mt-4 p-4 bg-gray-100 rounded-md text-sm text-gray-700">
            <h4 className="font-bold mb-2">Tips:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Use clear and specific topics (e.g., &quot;Blob storage in Azure&quot;).</li>
              <li>Use your preferred language for the questions and answers.</li>
              <li>Include any specific subtopics or areas of focus (e.g., &quot;focus on the process of photosynthesis&quot;).</li>
              <li>Provide context if necessary (e.g., &quot;for a Azure Developer certification exam&quot;).</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}