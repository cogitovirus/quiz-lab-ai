// src/app/lib/types/quiz.ts
export interface QuizConfig {
    prompt: string;
    difficulty: string;
    numQuestions: number;
    questionType: string;
  }
  
  export interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    explanation: string;
    answer: string;
  }
  
  export interface QuizState {
    questions: QuizQuestion[];
    userAnswers: Record<string, string>;
    status: 'idle' | 'generating' | 'active' | 'submitted';
    results?: QuizResults;
  }
  
  export interface QuizResults {
    score: number;
    feedback: Record<string, {
      correct: boolean;
      explanation: string;
    }>;
  }
  
  export interface ValidationResult {
    correct: boolean;
    explanation: string;
  }
  