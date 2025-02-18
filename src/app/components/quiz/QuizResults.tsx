// import React, { useState } from 'react';
// import { QuizQuestion } from '../../lib/types/quiz';

// const QuizResults = ({ questions }: { questions: QuizQuestion[] }) => {
//   const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
//   const [showResults, setShowResults] = useState(false);

//   const handleAnswerChange = (questionId: string, answer: string) => {
//     setUserAnswers((prevAnswers) => ({
//       ...prevAnswers,
//       [questionId]: answer,
//     }));
//   };

//   const handleValidateAnswers = () => {
//     setShowResults(true);
//   };

//   return (
//     <div>
//       <h2>Quiz Results</h2>
//       {questions.map((question) => (
//         <div key={question.id}>
//           <h3>{question.question}</h3>
//           <ul>
//             {question.answers.map((answer, i) => (
//               <li key={i}>
//                 <label>
//                   <input
//                     type="radio"
//                     name={question.id}
//                     value={answer.text}
//                     checked={userAnswers[question.id] === answer.text}
//                     onChange={() => handleAnswerChange(question.id, answer.text)}
//                   />
//                   {answer.text}
//                 </label>
//               </li>
//             ))}
//           </ul>
//           {showResults && (
//             <p>
//               <strong>Explanation:</strong> {question.explanation}
//             </p>
//           )}
//         </div>
//       ))}
//       <button onClick={handleValidateAnswers}>Validate Answers</button>
//     </div>
//   );
// };

// export default QuizResults;