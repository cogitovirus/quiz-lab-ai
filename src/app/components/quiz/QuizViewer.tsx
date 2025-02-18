// app/(components)/quiz/QuizViewer.tsx

"use client";

import React from 'react'
import { useQuizContext } from '../../lib/contexts/QuizContext'
import Spinner from '../ui/Spinner'
import QuestionCard from './QuestionCard'
import QuizResultCard from './QuizResultCard'

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
  } = useQuizContext()

  // If quiz not started: show placeholder
  if (!quizStarted) {
    return (
      <div className="bg-white rounded-md shadow p-4">
        <p className="text-gray-500">Please enter the topic to generate questions.</p>
      </div>
    )
  }

  // If loading: show spinner
  if (isLoading) {
    return (
      <div className="bg-white rounded-md shadow p-4 flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  // If quiz is finished: show result card
  if (isFinished) {
    return (
      <QuizResultCard
        score={score}
        total={questions.length}
        onRedo={() => {
          // reset the quiz
          setIsFinished(false)
          // Optionally set quizStarted=false, questions=[], etc.
          // or you could handle this in QuizGenerator
        }}
      />
    )
  }

  // If we have no questions yet, possibly show an error or fallback
  if (questions.length === 0) {
    return (
      <div className="bg-white rounded-md shadow p-4">
        <p className="text-gray-500">No questions available.</p>
      </div>
    )
  }

  // Display the current question
  const currentQuestion = questions[currentQuestionIndex]

  const handleNext = (wasCorrect: boolean) => {
    if (wasCorrect) setScore(score + 1)

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setIsFinished(true)
    }
  }

  return (
    <QuestionCard
      question={currentQuestion}
      onNext={handleNext}
    />
  )
}