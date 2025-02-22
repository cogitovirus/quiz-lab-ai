"use client";

import React, { createContext, useContext, useState, ReactNode, useMemo } from "react";

interface Answer {
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  question: string;
  answers: Answer[];
  explanation?: string;
}

interface QuizContextValue {
  quizStarted: boolean;
  setQuizStarted: React.Dispatch<React.SetStateAction<boolean>>;

  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;

  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;

  currentQuestionIndex: number;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;

  isFinished: boolean;
  setIsFinished: React.Dispatch<React.SetStateAction<boolean>>;

  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

const QuizContext = createContext<QuizContextValue | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const value = useMemo(
    () => ({
      quizStarted,
      setQuizStarted,
      isLoading,
      setIsLoading,
      questions,
      setQuestions,
      currentQuestionIndex,
      setCurrentQuestionIndex,
      isFinished,
      setIsFinished,
      score,
      setScore,
    }),
    [quizStarted, isLoading, questions, currentQuestionIndex, isFinished, score]
  );

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

export function useQuizContext(): QuizContextValue {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuizContext must be used within a QuizProvider");
  }
  return context;
}
