// src/app/lib/services/openai/client.ts

import { QuizConfig, QuizQuestion } from "../../types/quiz";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const generateQuestionsFromPrompt = async (config: QuizConfig): Promise<QuizQuestion[]> => {
  const { prompt, numQuestions, difficulty } = config;

  const systemPrompt = `
    You are a helpful assistant that generates multiple-choice quiz questions.

    ## Instructions:
    You will receive a **topic**, **number of questions**, and a **difficulty level**.
    You must generate **${numQuestions}** questions on the topic **"${prompt}"**, ensuring that the difficulty level is strictly **"${difficulty}"**.

    ## **Difficulty Guidelines**:
    - **Easy**: Questions should be basic, requiring only fundamental knowledge.
    - **Medium**: Questions should require a solid understanding, with moderate complexity.
    - **Hard**: Questions should be complex, requiring deep knowledge and analysis.

    ## **Question Format**:
    Each question must include:
    1. A **multiple-choice question** relevant to the topic.
    2. Four possible answers (**A, B, C, D**), with **only one correct answer**.
    3. A **clear indication of the correct answer**.
    4. A **brief explanation** of why the correct answer is correct.

    ### **Important Rules**:
    - The difficulty must match the given level. **Do not simplify hard questions**.
    - Keep all content in the same language as the topic.

    Now, generate the quiz:
  `;

  const completion = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL,
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
