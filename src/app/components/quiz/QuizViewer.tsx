"use client";

import React from 'react';
import { useQuizContext } from '../../lib/contexts/QuizContext';
import Spinner from '../ui/Spinner';
import QuestionCard from './QuestionCard';
import QuizResultCard from './QuizResultCard';

export default function QuizViewer() {
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

  // If quiz not started: show placeholder
  if (!quizStarted) {
    return (
      <div className="bg-white rounded-md shadow p-4">
        <p className="text-gray-500">Please enter the topic to generate questions.</p>
      </div>
    );
  }

  // If loading: show spinner
  if (isLoading) {
    return (
      <div className="bg-white rounded-md shadow p-4 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  // If quiz is finished: show result card
  if (isFinished) {
    return (
      <QuizResultCard
        questions={questions}
        onRedo={() => {
          // reset the quiz
          setIsFinished(false);
          setQuizStarted(false);
          setCurrentQuestionIndex(0);
          setScore(0);
          setQuestions([]);
        }}
      />
    );
  }

  // If we have no questions yet, possibly show an error or fallback
  if (questions.length === 0) {
    return (
      <div className="bg-white rounded-md shadow p-4">
        <p className="text-gray-500">No questions available.</p>
      </div>
    );
  }

  // Display the current question
  const currentQuestion = questions[currentQuestionIndex];

  const handleNext = (wasCorrect: boolean) => {
    if (wasCorrect) setScore(score + 1);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  return (
    <QuestionCard
      question={currentQuestion}
      onNext={handleNext}
    />
  );
}