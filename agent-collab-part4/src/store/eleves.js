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
