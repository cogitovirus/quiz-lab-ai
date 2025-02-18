// app/(components)/quiz/QuestionCard.tsx

"use client";

import React, { useState } from 'react'
import PrimaryButton from '../ui/PrimaryButton'

interface QuestionCardProps {
  question: {
    text: string
    correctAnswer: string
  }
  onNext: (wasCorrect: boolean) => void
}

export default function QuestionCard({ question, onNext }: QuestionCardProps) {
  const [userAnswer, setUserAnswer] = useState('')
  const [validated, setValidated] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const handleValidate = () => {
    const correct = userAnswer.trim().toLowerCase() === question.correctAnswer.toLowerCase()
    setIsCorrect(correct)
    setValidated(true)
  }

  return (
    <div className="bg-white rounded-md shadow p-4">
      <h3 className="font-bold text-lg mb-2">{question.text}</h3>
      <input
        type="text"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        placeholder="Your answer..."
        className="border border-gray-300 rounded px-3 py-2 text-sm w-full mb-4"
      />

      {!validated ? (
        <PrimaryButton onClick={handleValidate}>Validate</PrimaryButton>
      ) : (
        <div>
          {isCorrect ? (
            <p className="text-green-600 mb-4">Correct!</p>
          ) : (
            <p className="text-red-600 mb-4">Incorrect.</p>
          )}
          <PrimaryButton onClick={() => onNext(isCorrect)}>
            Next Question
          </PrimaryButton>
        </div>
      )}
    </div>
  )
}
