// src/app/components/quiz/QuizResults.tsx
import React from 'react';
import { QuizQuestion } from '../../lib/types/quiz';

const QuizResults = ({ questions }: { questions: QuizQuestion[] }) => {
  return (
    <div>
      <h2>Quiz Results</h2>
      {questions.map((question, index) => (
        <div key={index}>
          <h3>{question.question}</h3>
          <ul>
            {question.answers.map((answer, i) => (
              <li key={i} style={{ color: answer.isCorrect ? 'green' : 'black' }}>
                {answer.text}
              </li>
            ))}
          </ul>
          <p><strong>Explanation:</strong> {question.explanation}</p>
        </div>
      ))}
    </div>
  );
};

export default QuizResults;
