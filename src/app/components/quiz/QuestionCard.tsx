import React, { useState } from 'react';
import { QuizQuestion } from '../../lib/types/quiz';
import PrimaryButton from '../ui/PrimaryButton';

interface QuestionCardProps {
  question: QuizQuestion;
  onNext: (wasCorrect: boolean) => void;
}

export default function QuestionCard({ question, onNext }: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerChange = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const correctAnswer = question.answers.find((answer) => answer.isCorrect)?.text;
    const wasCorrect = selectedAnswer === correctAnswer;
    setShowExplanation(true);
    setTimeout(() => {
      setShowExplanation(false);
      setSubmitted(false);
      onNext(wasCorrect);
    }, 2000); // Show explanation for 2 seconds before moving to the next question
  };

  return (
    <div className="bg-white rounded-md shadow p-4 flex flex-col items-center">
      <h2>{question.question}</h2>
      <ul>
        {question.answers.map((answer, i) => (
          <li key={i} className={`mb-2 ${submitted && answer.isCorrect ? 'text-green-500' : submitted && selectedAnswer === answer.text && !answer.isCorrect ? 'text-red-500' : ''}`}>
            <label className="flex items-center">
              <input
                type="radio"
                name={question.id}
                value={answer.text}
                checked={selectedAnswer === answer.text}
                onChange={() => handleAnswerChange(answer.text)}
                className="mr-2"
                disabled={submitted}
              />
              {answer.text}
            </label>
          </li>
        ))}
      </ul>
      {showExplanation && (
        <p className="text-gray-700 mt-4">
          <strong>Explanation:</strong> {question.explanation}
        </p>
      )}
      <PrimaryButton onClick={handleSubmit} disabled={!selectedAnswer || submitted}>
        Submit
      </PrimaryButton>
    </div>
  );
}