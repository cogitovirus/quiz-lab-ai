import React, { useEffect, useState, useRef, useCallback } from "react";
import { useQuizContext } from "../../lib/contexts/QuizContext";
import QuizControls from "./QuizControls";
import ShortcutHints from "./ShortcutHints";

interface QuizGeneratorProps {
  isActive: boolean;
}

const QuizGenerator: React.FC<QuizGeneratorProps> = ({ isActive }) => {
  const {
    setQuizStarted,
    setIsLoading,
    setQuestions,
    setCurrentQuestionIndex,
    setIsFinished,
    setScore,
  } = useQuizContext();

  const [prompt, setPrompt] = useState<string>("");
  const [numQuestions, setNumQuestions] = useState<number>(15);
  const [difficulty, setDifficulty] = useState<string>("easy");
  const inputRef = useRef<HTMLInputElement>(null);

  // Function to fetch questions in batches
  const fetchQuestionsInBatches = useCallback(
    async (prompt: string, numQuestions: number, difficulty: string) => {
      const batchSize = 15;
      const totalBatches = Math.ceil(numQuestions / batchSize);
      setIsLoading(true);

      try {
        const batchPromises = Array.from({ length: totalBatches }, (_, i) => {
          const batchConfig = {
            prompt,
            numQuestions: Math.min(batchSize, numQuestions - i * batchSize),
            difficulty,
          };

          return fetch("/api/quiz/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(batchConfig),
          })
            .then((res) => res.json())
            .catch(() => []);
        });

        const results = await Promise.all(batchPromises);
        setQuestions(results.flat());
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setQuestions]
  );

  // Memoized handleGenerate function
  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) return;

    setQuizStarted(true);
    setIsFinished(false);
    setScore(0);
    setQuestions([]);
    setCurrentQuestionIndex(0);

    await fetchQuestionsInBatches(prompt, numQuestions, difficulty);
  }, [
    prompt,
    numQuestions,
    difficulty,
    setQuizStarted,
    setIsFinished,
    setScore,
    setQuestions,
    setCurrentQuestionIndex,
    fetchQuestionsInBatches,
  ]);

  // Memoized handleReset function
  const handleReset = useCallback(() => {
    setQuizStarted(false);
    setIsLoading(false);
    setIsFinished(false);
    setScore(0);
    setCurrentQuestionIndex(0);
  }, [setQuizStarted, setIsLoading, setIsFinished, setScore, setCurrentQuestionIndex]);

  // Handle keyboard shortcuts
  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isActive) return;

      const { key, ctrlKey, metaKey, shiftKey } = event;
      const isCtrlOrMeta = ctrlKey || metaKey;

      if (isCtrlOrMeta) {
        if (key === "ArrowLeft") {
          setNumQuestions((prev) => Math.max(prev - 1, 1));
        } else if (key === "ArrowRight") {
          setNumQuestions((prev) => Math.min(prev + 1, 45));
        } else if (key === "ArrowUp") {
          setDifficulty((prev) =>
            prev === "easy" ? "medium" : prev === "medium" ? "hard" : "hard"
          );
        } else if (key === "ArrowDown") {
          setDifficulty((prev) =>
            prev === "hard" ? "medium" : prev === "medium" ? "easy" : "easy"
          );
        } else if (shiftKey && key.toLowerCase() === "x") {
          handleReset();
        }
      } else if (key === "Enter") {
        event.preventDefault(); // Prevent form submission
        handleGenerate();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isActive, handleGenerate, handleReset]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-md shadow p-4 flex flex-col h-full w-full">
      <QuizControls
        prompt={prompt}
        onPromptChange={setPrompt}
        onGenerate={handleGenerate}
        onReset={handleReset}
        numQuestions={numQuestions}
        onNumQuestionsChange={setNumQuestions}
        difficulty={difficulty}
        onDifficultyChange={setDifficulty}
        inputRef={inputRef}
      />

      <div className="mt-auto">
        <ShortcutHints />
      </div>
    </div>
  );
};

export default QuizGenerator;
