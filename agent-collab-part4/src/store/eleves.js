import { atom } from 'nanostores'

function genererAvatarUrl(prenom, nom, sexe) {
  const seed = `${prenom}-${nom}`
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
    appreciation: `
    <div class="appreciation">
      <p><strong>Emma Dupont</strong> a montré un <em>fort besoin d'auto-organisation et de confiance en soi</em>, mais elle reste encore en phase de développement dans plusieurs domaines.</p>
      
      <p>Elle n'a pas encore participé aux discussions de classe ni levé la main pour répondre, ce qui limite sa contribution. Son comportement est souvent marqué par des <span style="color: #e74c3c;">conflits avec ses camarades</span> et une <span style="color: #e74c3c;">gestion des émotions difficile</span>.</p>
      
      <p><span style="color: #27ae60;"><strong>En revanche</strong></span>, elle a un <em>sens du travail</em> et ne se lasse jamais de terminer ses tâches sans aide.</p>
      
      <p>Il serait utile de lui offrir des <mark>opportunités de prise d'initiative</mark> et de dialogue pour renforcer sa confiance en soi.</p>
      
      <p><strong>Emma</strong>, je te soutiens dans ton élan et espère que tu vas progresser vers une <em>meilleure autonomie et participation</em>.</p>
    </div>
  `,
    note_appreciation: 2,
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
    note_appreciation: 5,
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
    note_appreciation: Math.floor(Math.random() * 5) + 1,
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
    note_appreciation: Math.floor(Math.random() * 5) + 1,
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
    note_appreciation: Math.floor(Math.random() * 5) + 1,
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
    note_appreciation: Math.floor(Math.random() * 5) + 1,
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
    note_appreciation: Math.floor(Math.random() * 5) + 1,
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
    note_appreciation: Math.floor(Math.random() * 5) + 1,
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
    note_appreciation: Math.floor(Math.random() * 5) + 1,
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
    note_appreciation: Math.floor(Math.random() * 5) + 1,
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
    note_appreciation: Math.floor(Math.random() * 5) + 1,
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
    note_appreciation: Math.floor(Math.random() * 5) + 1,
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
    note_appreciation: Math.floor(Math.random() * 5) + 1,
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
    note_appreciation: Math.floor(Math.random() * 5) + 1,
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
    note_appreciation: Math.floor(Math.random() * 5) + 1,
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
    note_appreciation: Math.floor(Math.random() * 5) + 1,
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
    note_appreciation: Math.floor(Math.random() * 5) + 1,
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
    note_appreciation: Math.floor(Math.random() * 5) + 1,
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
    note_appreciation: Math.floor(Math.random() * 5) + 1,
  },
  {
    id: Math.random().toString(),
    nom: 'Lefebvre',
    prenom: 'Ethan',
    sexe: 'M',
    picture: genererAvatarUrl('Ethan', 'Lefebvre', 'M'),
    matieres: {
      lecture: 1,
      ecriture: 1,
      math: 1,
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
    appreciation: null,
    note_appreciation: 1,
  },
  {
    id: Math.random().toString(),
    nom: 'Muller',
    prenom: 'Inès',
    sexe: 'F',
    picture: genererAvatarUrl('Inès', 'Muller', 'F'),
    matieres: {
      lecture: 5,
      ecriture: 5,
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
    note_appreciation: 5,
  },
  {
    id: Math.random().toString(),
    nom: 'Laurent',
    prenom: 'Gabriel',
    sexe: 'M',
    picture: genererAvatarUrl('Gabriel', 'Laurent', 'M'),
    matieres: {
      lecture: 4,
      ecriture: 3,
      math: 4,
    },
    evaluations: {
      participation: {
        part_1: 4,
        part_2: 4,
        part_3: 4,
      },
      comportement: {
        comp_1: 4,
        comp_2: 4,
        comp_3: 4,
      },
      autonomie: {
        auto_1: 4,
        auto_2: 4,
        auto_3: 4,
      },
    },
    appreciation: null,
    note_appreciation: 5,
  },
  {
    id: Math.random().toString(),
    nom: 'Guerin',
    prenom: 'Lisa',
    sexe: 'F',
    picture: genererAvatarUrl('Lisa', 'Guerin', 'F'),
    matieres: {
      lecture: 1,
      ecriture: 2,
      math: 3,
    },
    evaluations: {
      participation: {
        part_1: 4,
        part_2: 3,
        part_3: 2,
      },
      comportement: {
        comp_1: 4,
        comp_2: 2,
        comp_3: 1,
      },
      autonomie: {
        auto_1: 2,
        auto_2: 3,
        auto_3: 3,
      },
    },
    appreciation: null,
    note_appreciation: 3,
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
    note_appreciation: Math.floor(Math.random() * 5) + 1,
  }
  $eleves.set([...$eleves.get(), newEleve])
}

export function removeEleve(id) {
  const eleves = $eleves.get()
  const updatedEleves = eleves.filter((eleve) => eleve.id !== id)
  $eleves.set(updatedEleves)
}
