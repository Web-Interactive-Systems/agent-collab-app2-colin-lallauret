import { SYMBOLS } from '@/utils/emojis'
import { atom } from 'nanostores'

export const $selectedAgentId = atom('')

export const $agents = atom([
  {
    id: Math.random().toString(),
    emoji: '🥐',
    title: 'Cuisto',
    role: 'Donne-moi des recettes réalisables avec cette liste d’ingrédients, en précisant le nom, le temps de préparation, les ingrédients nécessaires, les étapes, et des suggestions si des éléments manquent.',
    response_format: 'text',
    temperature: 0.1,
    desired_response:
      'Recette : [Nom de la recette] — Temps : [Durée] — Ingrédients : [liste] — Étapes : [étape 1, étape 2, ...] — Suggestion : [astuce ou variante].',
  },
  {
    id: Math.random().toString(),
    emoji: '🥊',
    title: 'Metabo calculo',
    role: 'Pose-moi les bonnes questions pour calculer mon métabolisme de base (BMR) et mes besoins caloriques journaliers (TDEE), puis donne-moi une analyse complète avec recommandations selon mon objectif.',
    response_format: 'text',
    temperature: 0.7,
    desired_response:
      'BMR : [valeur] kcal — TDEE : [valeur] kcal — Objectif : [objectif et calories] — Répartition : [protéines]g protéines, [glucides]g glucides, [lipides]g lipides.',
  },
  {
    id: Math.random().toString(),
    emoji: '📝',
    title: 'Resumo mailo',
    role: 'Résume cet email en 3 lignes maximum, extrais les mots-clés importants, identifie le ton du message, et propose une réponse rapide si possible.',
    response_format: 'text',
    temperature: 0.7,
    desired_response:
      'Résumé : [phrase courte résumée] — Mots-clés : [liste] — Ton : [type de ton] — Réponse suggérée : [réponse rapide si utile].',
  },
  {
    id: Math.random().toString(),
    emoji: '🚀',
    title: '(1) FitBot',
    role: 'Pose-moi toutes les questions nécessaires pour calculer mon métabolisme de base (âge, sexe, taille, poids, activité, etc.).',
    response_format: 'text',
    temperature: 0.7,
    desired_response:
      'Merci, voici les infos : Âge : [âge], Sexe : [homme/femme], Taille : [cm], Poids : [kg], Activité : [niveau ou pas/séances], Objectif : [objectif précisé].',
  },
  {
    id: Math.random().toString(),
    emoji: '🚀',
    title: '(2) FitBot',
    role: 'Donne-moi mes macros journalières et calories pour maintenir mon poids avec ces infos.',
    response_format: 'text',
    temperature: 0.7,
    desired_response:
      'TDEE : [xxxx] kcal — Répartition : [protéines]g protéines, [glucides]g glucides, [lipides]g lipides — Ratio : [x]% / [y]% / [z]% — Objectif : maintien.',
  },
  {
    id: Math.random().toString(),
    emoji: '🚀',
    title: '(3) FitBot',
    role: 'Propose-moi une ou plusieurs recettes qui correspondent à ces macros : [xxxx kcal], [xx g prot], [xx g glucides], [xx g lipides].',
    response_format: 'text',
    temperature: 0.7,
    desired_response:
      'Recette : [Nom] — Kcal : [xxx] — P: [x]g / G: [x]g / L: [x]g — Ingrédients : [liste] — Étapes : [étapes 1, 2, 3…].',
  },
])

// 20ans, homme, 180cm, 80kg, 3x/semaine, 10000pas, maintien

export const addAgent = (agent = {}) => {
  const agents = $agents.get()
  // if has id, then update existing,
  // else create new agent
  if (agent?.id) {
    const index = agents.findIndex((e) => e.id === agent.id)
    agents[index] = { ...agents[index], ...agent }
    $agents.set([...agents])
  } else {
    agent.id = Math.random().toString()
    agent.emoji = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
    agent.temperature = 0.7
    $agents.set([agent, ...agents])
  }

  // set current as selected
  $selectedAgentId.set(agent.id)
}

export const removeAgent = (id) => {
  const agents = $agents.get()
  $agents.set(agents.filter((e) => e.id !== id))
}
