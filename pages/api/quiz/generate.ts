import { NextApiRequest, NextApiResponse } from 'next';
import { generateQuestionsFromPrompt } from '../../../src/app/lib/services/openai/client';
import { QuizConfig } from '../../../src/app/lib/types/quiz';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const config: QuizConfig = req.body as QuizConfig;
    const questions = await generateQuestionsFromPrompt(config);
    return res.status(200).json(questions);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    return res.status(500).json({ error: message });
  }
}
