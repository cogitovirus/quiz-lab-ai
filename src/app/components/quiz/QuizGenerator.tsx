"use client";

"use client";

import React, { useState } from 'react'
import { useQuizContext } from '../../lib/contexts/QuizContext'
import QuizControls from './QuizControls'
import ShortcutHints from './ShortcutHints'

export default function QuizGenerator() {
  const {
    quizStarted,
    setQuizStarted,
    isLoading,
    setIsLoading,
    setQuestions,
    setCurrentQuestionIndex,
    setIsFinished,
    setScore,
  } = useQuizContext()

  const [prompt, setPrompt] = useState('')

  const handleGenerate = async () => {
    if (!prompt) return

    setQuizStarted(true)
    setIsLoading(true)
    setIsFinished(false)
    setScore(0)
    setQuestions([]) // clear previous data
    setCurrentQuestionIndex(0)

    // Simulate fetch/generation logic
    // Typically you’d call your server or AI endpoint here.
    // For demonstration:
    setTimeout(() => {
      // Example data from "server"
      const simulatedQuestions = [
        { text: 'What is 2+2?', correctAnswer: '4' },
        { text: 'Capital of France?', correctAnswer: 'paris' },
      ]
      setQuestions(simulatedQuestions)
      setIsLoading(false)
    }, 2000)
  }

  const handleRegenerate = () => {
    // Could do something similar but maybe the same or new prompt
    handleGenerate()
  }

  return (
    <div className="bg-white rounded-md shadow p-4 flex flex-col h-full justify-between">
      <QuizControls
        prompt={prompt}
        onPromptChange={setPrompt}
        onGenerate={handleGenerate}
        onRegenerate={handleRegenerate}
      />

      <div className="mt-4">
        <ShortcutHints />
      </div>
    </div>
  )
}


// import React, { useState } from 'react';
// import QuizResults from './QuizResults';
// import { QuizQuestion } from '../../lib/types/quiz';
// import PrimaryButton from '../ui/PrimaryButton';

// const QuizGenerator = () => {
//   const [prompt, setPrompt] = useState('');
//   const [numQuestions, setNumQuestions] = useState(5);
//   const [difficulty, setDifficulty] = useState('easy');
//   const [questions, setQuestions] = useState<QuizQuestion[] | null>(null);

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     const config = { prompt, numQuestions, difficulty };
//     const response = await fetch('/api/quiz/generate', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(config),
//     });
//     const generatedQuestions = await response.json();
//     setQuestions(generatedQuestions);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="prompt">Enter Prompt:</label>
//         <input
//           type="text"
//           id="prompt"
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//         />

//         <label htmlFor="numQuestions">Number of Questions:</label>
//         <input
//           type="number"
//           id="numQuestions"
//           value={numQuestions}
//           onChange={(e) => setNumQuestions(Number(e.target.value))}
//         />

//         <label htmlFor="difficulty">Difficulty:</label>
//         <select
//           id="difficulty"
//           value={difficulty}
//           onChange={(e) => setDifficulty(e.target.value)}
//         >
//           <option value="easy">Easy</option>
//           <option value="medium">Medium</option>
//           <option value="hard">Hard</option>
//         </select>

//         <PrimaryButton type="submit">Generate Quiz</PrimaryButton>
//       </form>

//       {questions && <QuizResults questions={questions} />}
//     </div>
//   );
// };

// export default QuizGenerator;
