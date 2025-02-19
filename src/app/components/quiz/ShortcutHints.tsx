// app/(components)/quiz/ShortcutHints.tsx

import React from 'react'

export default function ShortcutHints() {
  return (
    <div className="bg-gray-100 p-3 rounded-md text-sm text-gray-700">
      <h4 className="font-bold mb-2">Keyboard Shortcuts:</h4>
      <ul className="list-disc list-inside space-y-1">
        <li><strong>Tab</strong> - Switch between cards </li>
        <li>
          <strong>Enter</strong>
          <ul className="list-disc list-inside ml-4">
            <li>Submit prompt (when on generate card)</li>
            <li>Submit answer (when on quiz viewer card)</li>
          </ul>
        </li>
        <li><strong>Arrow up/down</strong> - Switch between answers toggles</li>
        <li><strong>R</strong> -  Regenerate quiz with the same prompt</li>
        <li><strong>Ctrl/⌘ + R</strong> - Reset quiz</li>
        <li><strong>Ctrl/⌘ + Arrow up/down</strong> - Increase/decrease difficulty</li>
        <li><strong>Ctrl/⌘ + Arrow right/left</strong> - Increase/decrease number of questions</li>
      </ul>
    </div>
  )
}
