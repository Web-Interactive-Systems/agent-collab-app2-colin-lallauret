import { atom } from 'nanostores'

export const $criteresEvaluation = atom({
  participation: {
    titre: 'Participation',
    questions: [
      {
        id: 'part_1',
        question: "L'élève participe-t-il aux discussions de classe ?",
        reponses: [
          { valeur: 1, texte: 'Jamais' },
          { valeur: 2, texte: 'Rarement' },
          { valeur: 3, texte: 'Parfois' },
          { valeur: 4, texte: 'Souvent' },
          { valeur: 5, texte: 'Toujours' },
        ],
      },
      {
        id: 'part_2',
        question: "L'élève lève-t-il la main pour répondre ?",
        reponses: [
          { valeur: 1, texte: "N'ose jamais" },
          { valeur: 2, texte: 'Très rarement' },
          { valeur: 3, texte: 'De temps en temps' },
          { valeur: 4, texte: 'Régulièrement' },
          { valeur: 5, texte: 'Spontanément' },
        ],
      },
      {
        id: 'part_3',
        question: "L'élève prend-il des initiatives dans les activités ?",
        reponses: [
          { valeur: 1, texte: 'Aucune initiative' },
          { valeur: 2, texte: "Attend toujours qu'on lui dise" },
          { valeur: 3, texte: 'Quelques initiatives' },
          { valeur: 4, texte: 'Propose souvent des idées' },
          { valeur: 5, texte: 'Leader naturel' },
        ],
      },
    ],
  },

  comportement: {
    titre: 'Comportement',
    questions: [
      {
        id: 'comp_1',
        question: "L'élève respecte-t-il les règles de classe ?",
        reponses: [
          { valeur: 1, texte: 'Ne respecte jamais' },
          { valeur: 2, texte: 'Respecte difficilement' },
          { valeur: 3, texte: 'Respecte généralement' },
          { valeur: 4, texte: 'Respecte bien' },
          { valeur: 5, texte: 'Respecte parfaitement' },
        ],
      },
      {
        id: 'comp_2',
        question: "Comment l'élève interagit-il avec ses camarades ?",
        reponses: [
          { valeur: 1, texte: 'Conflits fréquents' },
          { valeur: 2, texte: 'Difficultés relationnelles' },
          { valeur: 3, texte: 'Relations correctes' },
          { valeur: 4, texte: 'Bonnes relations' },
          { valeur: 5, texte: "Excellent esprit d'équipe" },
        ],
      },
      {
        id: 'comp_3',
        question: "L'élève gère-t-il bien ses émotions ?",
        reponses: [
          { valeur: 1, texte: 'Très difficile' },
          { valeur: 2, texte: 'Colères fréquentes' },
          { valeur: 3, texte: 'Gestion acceptable' },
          { valeur: 4, texte: 'Bonne maîtrise' },
          { valeur: 5, texte: 'Excellente maîtrise' },
        ],
      },
    ],
  },

  autonomie: {
    titre: 'Autonomie',
    questions: [
      {
        id: 'auto_1',
        question: "L'élève organise-t-il son travail ?",
        reponses: [
          { valeur: 1, texte: 'Aucune organisation' },
          { valeur: 2, texte: "A besoin d'aide constante" },
          { valeur: 3, texte: 'Organisation partielle' },
          { valeur: 4, texte: 'Bien organisé' },
          { valeur: 5, texte: 'Parfaitement organisé' },
        ],
      },
      {
        id: 'auto_2',
        question: "L'élève termine-t-il ses tâches sans aide ?",
        reponses: [
          { valeur: 1, texte: 'Jamais sans aide' },
          { valeur: 2, texte: 'Aide fréquente nécessaire' },
          { valeur: 3, texte: 'Aide occasionnelle' },
          { valeur: 4, texte: "Rarement besoin d'aide" },
          { valeur: 5, texte: 'Totalement autonome' },
        ],
      },
      {
        id: 'auto_3',
        question: "L'élève prend-il soin de son matériel ?",
        reponses: [
          { valeur: 1, texte: 'Très négligent' },
          { valeur: 2, texte: 'Souvent négligent' },
          { valeur: 3, texte: 'Attention correcte' },
          { valeur: 4, texte: 'Soigneux' },
          { valeur: 5, texte: 'Très soigneux' },
        ],
      },
    ],
  },
})
