// app/(components)/quiz/ShortcutHints.tsx

import React from 'react'

export default function ShortcutHints() {
  return (
    <div className="bg-gray-100 p-3 rounded-md text-sm text-gray-700">
      <h4 className="font-bold mb-2">Keyboard Shortcuts:</h4>
      <ul className="list-disc list-inside space-y-1">
        <li><strong>Enter</strong> — Submit prompt / next question</li>
        <li><strong>R</strong> — Regenerate quiz</li>
        <li><strong>Esc</strong> — ??? (custom usage)</li>
        {/* Add your shortcuts as needed */}
      </ul>
    </div>
  )
}
