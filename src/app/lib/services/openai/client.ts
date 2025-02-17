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
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "typescript_quiz_schema",
        schema: {
          type: "object",
          properties: {
            questions: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  question: {
                    type: "string",
                    description: "The question text"
                  },
                  answers: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        text: {
                          type: "string",
                          description: "Answer text"
                        },
                        isCorrect: {
                          type: "boolean",
                          description: "Indicates if the answer is correct"
                        }
                      },
                      required: ["text", "isCorrect"]
                    },
                    description: "Array of possible answers"
                  },
                  explanation: {
                    type: "string",
                    description: "Explanation of the correct answer"
                  }
                },
                required: ["question", "answers", "explanation"]
              },
              description: "List of quiz questions"
            }
          },
          required: ["questions"]
        }
      }
    },
  });

  const data = completion.choices[0].message.content;
  if (data === null) {
    throw new Error("Received null data from OpenAI API");
  };
  const questions: QuizQuestion[] = JSON.parse(data).questions;

  return questions;
};
