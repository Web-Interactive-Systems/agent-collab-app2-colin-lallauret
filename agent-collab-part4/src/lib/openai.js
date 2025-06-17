// Package nodeJS créer par OpenAI
import OpenAI from 'openai'

export async function getAIClient({
  baseURL = import.meta.env.VITE_IA_BASE_URL, // Vide pour utiliser l'URL par défaut de l'API OpenAI
  apiKey = import.meta.env.VITE_OPENAI_API_KEY, // Clé d'authentification
  model = import.meta.env.VITE_IA_MODEL,
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
