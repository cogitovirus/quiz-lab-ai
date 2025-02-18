// app/(components)/quiz/QuizControls.tsx

import React from 'react'
import PrimaryButton from '../ui/PrimaryButton'

interface QuizControlsProps {
  prompt: string
  onPromptChange: (val: string) => void
  onGenerate: () => void
  onRegenerate: () => void
}

export default function QuizControls({
  prompt,
  onPromptChange,
  onGenerate,
  onRegenerate,
}: QuizControlsProps) {
  return (
    <div className="space-y-4">
      <input
        type="text"
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        placeholder="Enter quiz topic..."
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
      />

      <div className="flex items-center gap-2">
        <PrimaryButton onClick={onGenerate}>Generate</PrimaryButton>
        <button
          onClick={onRegenerate}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Regenerate
        </button>
        {/* Additional config button if needed */}
      </div>
    </div>
  )
}
