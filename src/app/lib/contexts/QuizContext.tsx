// app/(context)/QuizContext.tsx

"use client"; // important for context & state in Next.js app router

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface QuizContextValue {
  quizStarted: boolean
  setQuizStarted: React.Dispatch<React.SetStateAction<boolean>>
  
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  
  questions: any[]        // Replace any[] with a type for your question objects
  setQuestions: React.Dispatch<React.SetStateAction<any[]>>
  
  currentQuestionIndex: number
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>
  
  isFinished: boolean
  setIsFinished: React.Dispatch<React.SetStateAction<boolean>>
  
  score: number
  setScore: React.Dispatch<React.SetStateAction<number>>
}

const QuizContext = createContext<QuizContextValue | undefined>(undefined)

export function QuizProvider({ children }: { children: ReactNode }) {
  const [quizStarted, setQuizStarted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [questions, setQuestions] = useState<any[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [score, setScore] = useState(0)

  // This object will be passed down through the context
  const value: QuizContextValue = {
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
  }

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  )
}

// A custom hook to consume QuizContext, for convenience
export function useQuizContext() {
  const context = useContext(QuizContext)
  if (!context) {
    throw new Error('useQuizContext must be used within a QuizProvider')
  }
  return context
}
