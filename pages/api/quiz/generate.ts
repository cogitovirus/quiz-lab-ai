import { NextApiRequest, NextApiResponse } from 'next';
import { generateQuestionsFromPrompt } from '../../../src/app/lib/services/openai/client';
import { QuizConfig } from '../../../src/app/lib/types/quiz';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const config: QuizConfig = req.body;
    try {
      const questions = await generateQuestionsFromPrompt(config);
      res.status(200).json(questions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}