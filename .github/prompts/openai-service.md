# Generate Quiz Questions from Prompt

## Description

This service generates multiple-choice quiz questions based on a provided prompt. It integrates with the OpenAI API to generate questions, four possible answers, the correct answer, and an explanation for why the correct answer is correct.

The prompt template enriches the user prompt with system-level information and additional configuration parameters (like number of questions). The result will be a JSON object representing the questions, answers, and explanations in the following schema.

## Parameters

- `prompt`: The main text prompt that describes the topic for the quiz.
- `num_questions`: The number of quiz questions to generate.
- `difficulty`: The difficulty level of the quiz questions ('easy', 'medium', 'hard').

## Schema

The service will return a JSON object that adheres to the following schema:

```json
{
  "questions": [
    {
      "question": "string",
      "answers": [
        {
          "text": "string",
          "isCorrect": boolean
        },
        {
          "text": "string",
          "isCorrect": boolean
        },
        {
          "text": "string",
          "isCorrect": boolean
        },
        {
          "text": "string",
          "isCorrect": boolean
        }
      ],
      "correctAnswer": "string",
      "explanation": "string"
    }
  ]
}
```

## System prompt

You are a helpful assistant that generates multiple-choice quiz questions. You will receive a topic, number of questions, and difficulty level, and you will return a set of questions based on the following format:

- The quiz should contain {{num_questions}} questions about the topic "{{topic}}" with a difficulty of "{{difficulty}}".
- Each question will have four possible answers. Only one of them will be correct, and you should indicate which answer is correct.
- For each question, provide a brief explanation of why the correct answer is the right one.

### Quiz Format Example:

{
  "question": "What is the capital of France?",
  "answers": [
    { "text": "Berlin", "isCorrect": false },
    { "text": "Madrid", "isCorrect": false },
    { "text": "Paris", "isCorrect": true },
    { "text": "Rome", "isCorrect": false }
  ],
  "correctAnswer": "Paris",
  "explanation": "Paris is the capital and largest city of France."
}

Please generate the quiz questions based on the provided parameters.
