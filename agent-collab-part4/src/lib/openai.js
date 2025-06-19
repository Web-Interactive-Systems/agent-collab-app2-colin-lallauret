import OpenAI from 'openai'
import { getIaBaseUrl, getIaModel } from '@/store/settings'

export async function getAIClient({
  baseURL = getIaBaseUrl(),
  apiKey = import.meta.env.VITE_OPENAI_API_KEY,
  model = getIaModel(),
  role = 'Your are a wonderful assistant',
  temperature = 0.7,
} = {}) {
  return {
    openai: new OpenAI({
      baseURL,
      apiKey,
      dangerouslyAllowBrowser: true,
    }),
    cfg: {
      model,
      role,
      temperature,
    },
  }
}
