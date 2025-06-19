import { atom } from 'nanostores'

function genererAvatarUrl(prenom, nom, sexe) {
  const seed = `${prenom}-${nom}-${Math.random().toString(36).substr(2, 9)}` // Ajout de random pour unicité
  const gender = sexe === 'F' ? 'female' : 'male'

  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&gender=${gender}&size=128`
}

function genererNotesAleatoires() {
  return {
    lecture: Math.floor(Math.random() * 5) + 1,
    ecriture: Math.floor(Math.random() * 5) + 1,
    math: Math.floor(Math.random() * 5) + 1,
  }
}

export const $selectedEleveId = atom('')

export const $eleves = atom([
  {
    id: Math.random().toString(),
    nom: 'Dupont',
    prenom: 'Emma',
    sexe: 'F',
    picture: genererAvatarUrl('Emma', 'Dupont', 'F'),
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
      "Emma a des difficultés significatives dans plusieurs domaines. Elle manque d'engagement en classe, ne participe pas aux discussions et n'a pas d'initiatives. Son comportement est agité, avec des conflits avec ses camarades et des émotions difficiles à gérer. Elle n'organise pas son travail et néglige son matériel. Il serait utile de lui offrir un soutien personnalisé pour améliorer sa participation, sa gestion des émotions et sa responsabilité.",
  },
  {
    id: Math.random().toString(),
    nom: 'Martin',
    prenom: 'Lucas',
    sexe: 'M',
    picture: genererAvatarUrl('Lucas', 'Martin', 'M'),
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
    picture: genererAvatarUrl('Camille', 'Leroy', 'F'),
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
    picture: genererAvatarUrl('Théo', 'Bernard', 'M'),
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
    picture: genererAvatarUrl('Léa', 'Moreau', 'F'),
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
  {
    id: Math.random().toString(),
    nom: 'Durand',
    prenom: 'Hugo',
    sexe: 'M',
    picture: genererAvatarUrl('Hugo', 'Durand', 'M'),
    matieres: genererNotesAleatoires(),
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
    nom: 'Petit',
    prenom: 'Chloé',
    sexe: 'F',
    picture: genererAvatarUrl('Chloé', 'Petit', 'F'),
    matieres: genererNotesAleatoires(),
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
    nom: 'Roux',
    prenom: 'Maxime',
    sexe: 'M',
    picture: genererAvatarUrl('Maxime', 'Roux', 'M'),
    matieres: genererNotesAleatoires(),
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
    nom: 'Fournier',
    prenom: 'Manon',
    sexe: 'F',
    picture: genererAvatarUrl('Manon', 'Fournier', 'F'),
    matieres: genererNotesAleatoires(),
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
    nom: 'Girard',
    prenom: 'Nathan',
    sexe: 'M',
    picture: genererAvatarUrl('Nathan', 'Girard', 'M'),
    matieres: genererNotesAleatoires(),
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
    nom: 'Bonnet',
    prenom: 'Jade',
    sexe: 'F',
    picture: genererAvatarUrl('Jade', 'Bonnet', 'F'),
    matieres: genererNotesAleatoires(),
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
    nom: 'Simon',
    prenom: 'Antoine',
    sexe: 'M',
    picture: genererAvatarUrl('Antoine', 'Simon', 'M'),
    matieres: genererNotesAleatoires(),
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
    nom: 'Michel',
    prenom: 'Zoé',
    sexe: 'F',
    picture: genererAvatarUrl('Zoé', 'Michel', 'F'),
    matieres: genererNotesAleatoires(),
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
    nom: 'Garcia',
    prenom: 'Raphaël',
    sexe: 'M',
    picture: genererAvatarUrl('Raphaël', 'Garcia', 'M'),
    matieres: genererNotesAleatoires(),
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
    nom: 'David',
    prenom: 'Sarah',
    sexe: 'F',
    picture: genererAvatarUrl('Sarah', 'David', 'F'),
    matieres: genererNotesAleatoires(),
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
    nom: 'Bertrand',
    prenom: 'Jules',
    sexe: 'M',
    picture: genererAvatarUrl('Jules', 'Bertrand', 'M'),
    matieres: genererNotesAleatoires(),
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
    nom: 'Vincent',
    prenom: 'Lina',
    sexe: 'F',
    picture: genererAvatarUrl('Lina', 'Vincent', 'F'),
    matieres: genererNotesAleatoires(),
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
    nom: 'Rousseau',
    prenom: 'Tom',
    sexe: 'M',
    picture: genererAvatarUrl('Tom', 'Rousseau', 'M'),
    matieres: genererNotesAleatoires(),
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
    nom: 'Morel',
    prenom: 'Clara',
    sexe: 'F',
    picture: genererAvatarUrl('Clara', 'Morel', 'F'),
    matieres: genererNotesAleatoires(),
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
    nom: 'Lefebvre',
    prenom: 'Ethan',
    sexe: 'M',
    picture: genererAvatarUrl('Ethan', 'Lefebvre', 'M'),
    matieres: genererNotesAleatoires(),
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
    nom: 'Muller',
    prenom: 'Inès',
    sexe: 'F',
    picture: genererAvatarUrl('Inès', 'Muller', 'F'),
    matieres: genererNotesAleatoires(),
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
    nom: 'Laurent',
    prenom: 'Gabriel',
    sexe: 'M',
    picture: genererAvatarUrl('Gabriel', 'Laurent', 'M'),
    matieres: genererNotesAleatoires(),
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
    nom: 'Guerin',
    prenom: 'Lisa',
    sexe: 'F',
    picture: genererAvatarUrl('Lisa', 'Guerin', 'F'),
    matieres: genererNotesAleatoires(),
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
    picture: genererAvatarUrl(prenom, nom, sexe),
    matieres,
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
  }
  $eleves.set([...$eleves.get(), newEleve])
}

export function removeEleve(id) {
  const eleves = $eleves.get()
  const updatedEleves = eleves.filter((eleve) => eleve.id !== id)
  $eleves.set(updatedEleves)
}
