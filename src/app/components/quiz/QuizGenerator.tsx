import React, { useState } from 'react';
import { generateQuestionsFromPrompt } from '../../lib/services/openai/client';
import QuizResults from './QuizResults';

const QuizGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState('easy');
  const [questions, setQuestions] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const config = { prompt, numQuestions, difficulty };
    const generatedQuestions = await generateQuestionsFromPrompt(config);
    setQuestions(generatedQuestions);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="prompt">Enter Prompt:</label>
        <input
          type="text"
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <label htmlFor="numQuestions">Number of Questions:</label>
        <input
          type="number"
          id="numQuestions"
          value={numQuestions}
          onChange={(e) => setNumQuestions(e.target.value)}
        />

        <label htmlFor="difficulty">Difficulty:</label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <button type="submit">Generate Quiz</button>
      </form>

      {questions && <QuizResults questions={questions} />}
    </div>
  );
};

export default QuizGenerator;
