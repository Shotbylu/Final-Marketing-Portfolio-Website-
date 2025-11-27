import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

// Temporary hardcoded API key for testing
// TODO: Move to environment variable once we verify it works
const API_KEY = 'AIzaSyBl-Ewcdlw5NVtwKVTr7cPC4NVuF6WeqG0';

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: API_KEY,
    })
  ],
  model: 'gemini-1.5-flash-latest', // Use latest stable version
});
