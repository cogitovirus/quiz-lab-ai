"use client";

import React from "react";
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

  const handleNext = (wasCorrect: boolean) => {
    if (wasCorrect) setScore((prev) => prev + 1);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
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
            <QuestionCard
              question={questions[currentQuestionIndex]}
              onNext={handleNext}
              isActive={isActive}
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={questions.length}
            />
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
        </div>
      )}
    </div>
  );
}