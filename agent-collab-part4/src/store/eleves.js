import { atom } from 'nanostores'

export const $selectedEleveId = atom('')

export const $eleves = atom([
  {
    id: Math.random().toString(),
    nom: 'Dupont',
    prenom: 'Emma',
    sexe: 'F',
    matieres: {
      lecture: 4,
      ecriture: 3,
      math: 2,
    },
    evaluations: {
      participation: {
        part_1: 1,
        part_2: 1,
        part_3: 1,
      },
      comportement: {
        comp_1: 1,
        comp_2: 1,
        comp_3: 1,
      },
      autonomie: {
        auto_1: 1,
        auto_2: 1,
        auto_3: 1,
      },
    },
    appreciation:
      'Emma a des difficultés significatives dans plusieurs domaines. Elle manque d’engagement en classe, ne participe pas aux discussions et n’a pas d’initiatives. Son comportement est agité, avec des conflits avec ses camarades et des émotions difficiles à gérer. Elle n’organise pas son travail et néglige son matériel. Il serait utile de lui offrir un soutien personnalisé pour améliorer sa participation, sa gestion des émotions et sa responsabilité.',
  },
  {
    id: Math.random().toString(),
    nom: 'Martin',
    prenom: 'Lucas',
    sexe: 'M',
    matieres: {
      lecture: 3,
      ecriture: 2,
      math: 5,
    },
    evaluations: {
      participation: {
        part_1: 5,
        part_2: 5,
        part_3: 5,
      },
      comportement: {
        comp_1: 5,
        comp_2: 5,
        comp_3: 5,
      },
      autonomie: {
        auto_1: 5,
        auto_2: 5,
        auto_3: 5,
      },
    },
    appreciation: null,
  },
  {
    id: Math.random().toString(),
    nom: 'Leroy',
    prenom: 'Camille',
    sexe: 'F',
    matieres: {
      lecture: 2,
      ecriture: 1,
      math: 3,
    },
    evaluations: {
      participation: {
        part_1: null,
        part_2: null,
        part_3: null,
      },
      comportement: {
        comp_1: null,
        comp_2: null,
        comp_3: null,
      },
      autonomie: {
        auto_1: null,
        auto_2: null,
        auto_3: null,
      },
    },
    appreciation: null,
  },
  {
    id: Math.random().toString(),
    nom: 'Bernard',
    prenom: 'Théo',
    sexe: 'M',
    matieres: {
      lecture: 1,
      ecriture: 2,
      math: 2,
    },
    evaluations: {
      participation: {
        part_1: null,
        part_2: null,
        part_3: null,
      },
      comportement: {
        comp_1: null,
        comp_2: null,
        comp_3: null,
      },
      autonomie: {
        auto_1: null,
        auto_2: null,
        auto_3: null,
      },
    },
    appreciation: null,
  },
  {
    id: Math.random().toString(),
    nom: 'Moreau',
    prenom: 'Léa',
    sexe: 'F',
    matieres: {
      lecture: 4,
      ecriture: 5,
      math: 4,
    },
    evaluations: {
      participation: {
        part_1: null,
        part_2: null,
        part_3: null,
      },
      comportement: {
        comp_1: null,
        comp_2: null,
        comp_3: null,
      },
      autonomie: {
        auto_1: null,
        auto_2: null,
        auto_3: null,
      },
    },
    appreciation: null,
  },
])

export function addEleve(nom, prenom, sexe, matieres) {
  const newEleve = {
    id: Math.random().toString(),
    nom,
    prenom,
    sexe,
    matieres,
  }
  $eleves.set([...$eleves.get(), newEleve])
}

export function removeEleve(id) {
  const eleves = $eleves.get()
  const updatedEleves = eleves.filter((eleve) => eleve.id !== id)
  $eleves.set(updatedEleves)
}
