import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { z } from 'zod';
import {
  createUserCode,
  getAllUserCode,
  getUserCodeUsingId,
  getUserCodeUsingUsername,
} from './database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || '3000';

app.use(express.json());
app.use(cors());

app.get('/api/usercode', async (req, res) => {
  try {
    const data = await getAllUserCode();
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const userCodeInput = z.object({
  username: z.string().min(3),
  preferred_language: z.enum(['c++', 'java', 'javaScript', 'python']),
  stdin: z.string().optional(),
  source_code: z.string().min(1),
});

app.post('/api/usercode', async (req, res) => {
  const { username, preferred_language, stdin, source_code } = req.body;

  const parsedData = userCodeInput.safeParse({
    username,
    preferred_language,
    stdin,
    source_code,
  });
  if (!parsedData.success) {
    res.status(400).json({ error: parsedData.error });
    return;
  }

  try {
    const data = await createUserCode(
      username,
      preferred_language,
      stdin,
      source_code
    );
    res.status(201).json({ data });
  } catch (error) {
    console.error('Error creating user code:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/usercode/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const data = await getUserCodeUsingId(id);
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
