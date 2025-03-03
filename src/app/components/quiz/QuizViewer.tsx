import React, { useEffect, useState, useCallback } from "react";
import { useQuizContext } from "../../lib/contexts/QuizContext";
import Spinner from "../ui/Spinner";
import QuestionCard from "./QuestionCard";
import QuizResultCard from "./QuizResultCard";

interface QuizViewerProps {
  isActive: boolean;
}

const QuizViewer: React.FC<QuizViewerProps> = ({ isActive }) => {
  const {
    quizStarted,
    isLoading,
    questions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    isFinished,
    setIsFinished,
    score,
    setScore
  } = useQuizContext();

  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);

  // Reset the quiz
  const handleRedo = useCallback(() => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setIsFinished(false);
  }, [setScore, setCurrentQuestionIndex, setIsFinished]);

  // Handle keyboard shortcuts
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      setSelectedAnswerIndex((prev) => {
        if (event.key === "ArrowUp") {
          return prev === null ? 0 : Math.max(prev - 1, 0);
        }
        if (event.key === "ArrowDown") {
          return prev === null
            ? 0
            : Math.min(prev + 1, questions[currentQuestionIndex]?.answers.length - 1);
        }
        return prev;
      });

      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === "x") {
        handleRedo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isActive, questions, currentQuestionIndex, handleRedo]);

  // Handle next question
  const handleNext = useCallback(
    (wasCorrect: boolean) => {
      if (wasCorrect) {
        setScore((prev) => prev + 1);
      }

      setSelectedAnswerIndex(null); // Reset selected answer index for the next question

      setCurrentQuestionIndex((prev) => {
        if (prev < questions.length - 1) {
          return prev + 1;
        } else {
          setIsFinished(true);
          return prev;
        }
      });
    },
    [questions.length, setCurrentQuestionIndex, setIsFinished, setScore]
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-md shadow p-4 flex flex-col h-full w-full">
      {quizStarted ? (
        isLoading ? (
          <div className="flex items-center justify-center flex-grow flex-col">
            <p className="text-gray-500 dark:text-gray-300 mb-4">Please be patient, questions are being loaded...</p>
            <Spinner />
          </div>
        ) : isFinished ? (
          <div className="flex flex-col flex-grow">
            <QuizResultCard score={score} total={questions.length} onRedo={handleRedo} />
          </div>
        ) : questions.length > 0 ? (
          <div className="flex flex-col flex-grow">
            <QuestionCard
              question={questions[currentQuestionIndex]}
              onNext={handleNext}
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={questions.length}
              isActive={isActive}
            />
          </div>
        ) : (
          <div className="flex flex-col flex-grow items-center justify-center">
            <p className="text-gray-500 dark:text-gray-300">No questions available.</p>
          </div>
        )
      ) : (
        <div className="flex flex-col flex-grow">
          <div className="flex-grow flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-300">Enter the topic to generate questions.</p>
          </div>
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-md text-sm text-gray-700 dark:text-gray-300">
            <h4 className="font-bold mb-2">Tips:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Use clear and specific topics (e.g., &quot;Blob storage in Azure&quot;).</li>
              <li>Use your preferred language for the questions and answers.</li>
              <li>Include any specific subtopics or areas of focus (e.g., &quot;focus on the process of photosynthesis&quot;).</li>
              <li>Provide context if necessary (e.g., &quot;for an Azure Developer certification exam&quot;).</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizViewer;
