// app/(components)/quiz/QuizResultCard.tsx

import React from 'react'
import PrimaryButton from '../ui/PrimaryButton'

interface QuizResultCardProps {
  score: number
  total: number
  onRedo: () => void
}

export default function QuizResultCard({
  score,
  total,
  onRedo
}: QuizResultCardProps) {
  return (
    <div className="bg-white rounded-md shadow p-4 flex flex-col items-center">
      <h3 className="text-xl font-bold mb-2">Quiz Finished!</h3>
      <p className="text-gray-700 mb-4">
        You scored {score} out of {total}.
      </p>
      <PrimaryButton onClick={onRedo}>Redo</PrimaryButton>
    </div>
  )
}
