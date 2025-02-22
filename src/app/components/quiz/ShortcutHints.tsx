// filepath: /Users/wiktor/Projects/quiz-lab-ai/src/app/components/quiz/ShortcutHints.tsx
import React from 'react'

export default function ShortcutHints() {
  return (
    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md text-sm text-gray-700 dark:text-gray-300">
      <h4 className="font-bold mb-2">Keyboard Shortcuts:</h4>
      <ul className="list-disc list-inside space-y-1">
        <li><strong>Tab</strong> - Switch between cards </li>
        <li>
          <strong>Quiz Generator Card</strong>
          <ul className="list-disc list-inside ml-4">
            <li><strong>Enter</strong> - Submit prompt</li>
            <li><strong>Ctrl/⌘ + Arrow right/left</strong> - Increase/decrease number of questions</li>
            <li><strong>Ctrl/⌘ + Arrow up/down</strong> - Increase/decrease difficulty</li>
          </ul>
        </li>
        <li>
          <strong>Quiz Viewer Card</strong>
          <ul className="list-disc list-inside ml-4">
            <li><strong>Enter</strong> - Submit answer/next question</li>
            <li><strong>Arrow up/down</strong> - Switch between answers</li>
            <li><strong>Ctrl/⌘ + Shift + X</strong> - Reset quiz</li>
          </ul>
        </li>
      </ul>
    </div>
  )
}