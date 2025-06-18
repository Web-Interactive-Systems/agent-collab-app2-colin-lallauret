import { SYMBOLS } from '@/utils/emojis'
import { atom } from 'nanostores'

export const $selectedAgentId = atom('')

export const $agents = atom([
  {
    id: Math.random().toString(),
    emoji: '🎯',
    title: 'Analyste Participation',
    role: "Analyse les réponses sur la participation de l'élève (discussions, lever de main, initiatives) et rédige la première partie de l'appréciation en 1-2 phrases courtes et bienveillantes.",
    response_format: 'text',
    temperature: 0.7,
    desired_response:
      '[Prénom] participe [niveau] aux activités de classe et [description des initiatives]. [Point positif ou encouragement].',
  },

  {
    id: Math.random().toString(),
    emoji: '🤝',
    title: 'Analyste Comportement',
    role: "Analyse les réponses sur le comportement (respect des règles, interactions, gestion émotions) et rédige une phrase sur le savoir-être de l'élève.",
    response_format: 'text',
    temperature: 0.7,
    desired_response:
      'Son comportement est [qualificatif] avec [description relations/règles]. [Gestion émotionnelle si pertinent].',
  },

  {
    id: Math.random().toString(),
    emoji: '⚡',
    title: 'Analyste Autonomie',
    role: "Analyse les réponses sur l'autonomie (organisation, finition des tâches, soin du matériel) et rédige une phrase sur l'autonomie de l'élève.",
    response_format: 'text',
    temperature: 0.7,
    desired_response:
      "[Prénom] fait preuve d'[niveau] autonomie dans [aspects organisationnels]. [Soin du matériel si pertinent].",
  },

  {
    id: Math.random().toString(),
    emoji: '🌟',
    title: 'Synthétiseur Points Forts',
    role: "À partir des 3 analyses précédentes, identifie les 1-2 points forts principaux de l'élève et les formule de manière encourageante.",
    response_format: 'text',
    temperature: 0.6,
    desired_response:
      'Ses atouts : [1-2 qualités principales]. [Encouragement personnalisé].',
  },

  {
    id: Math.random().toString(),
    emoji: '📝',
    title: 'Rédacteur Final',
    role: 'Compile toutes les analyses en une appréciation fluide de maximum 600 caractères, avec un ton bienveillant et constructif pour les parents. Ajoute un conseil ou perspective si nécessaire.',
    response_format: 'text',
    temperature: 0.5,
    desired_response:
      "Appréciation complète et cohérente combinant participation, comportement, autonomie et points forts, avec éventuellement un axe d'amélioration ou encouragement pour la suite.",
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
