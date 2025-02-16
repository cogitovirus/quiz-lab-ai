// src/app/lib/services/openai/client.ts

import { QuizConfig, QuizQuestion } from "../../types/quiz";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const generateQuestionsFromPrompt = async (config: QuizConfig): Promise<QuizQuestion[]> => {
  const { prompt, numQuestions, difficulty } = config;

  const systemPrompt = `You are a helpful assistant that generates multiple-choice quiz questions. You will receive a topic, number of questions, and difficulty level, and you will return a set of questions based on the following format:

  - The quiz should contain ${numQuestions} questions about the topic "${prompt}" with a difficulty of "${difficulty}".
  - Each question will have four possible answers. Only one of them will be correct, and you should indicate which answer is correct.
  - For each question, provide a brief explanation of why the correct answer is the right one.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    store: true,
    messages: [
      { role: "user", content: systemPrompt }
    ]
  });

  const data = completion.choices[0].message.content;
  if (data === null) {
    throw new Error("Received null data from OpenAI API");
  };
  const questions: QuizQuestion[] = JSON.parse(data).questions;

  return questions;
};
