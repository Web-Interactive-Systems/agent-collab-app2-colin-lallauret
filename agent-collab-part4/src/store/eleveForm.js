import { computed } from 'nanostores'
import { $eleves, $selectedEleveId } from './eleves'

export const $currentEleve = computed([$eleves, $selectedEleveId], (eleves, id) =>
  eleves.find((e) => e.id === id),
)

export const setSelectedEleve = (id) => {
  const current = $selectedEleveId.get()
  const deselect = current === id
  deselect ? $selectedEleveId.set('') : $selectedEleveId.set(id)
}

export const updateCurrentEleve = (dataForm) => {
  const { id, participation = {}, comportement = {}, autonomie = {} } = dataForm

  let currentEleve = $currentEleve.get()

  currentEleve = {
    ...currentEleve,
    evaluations: {
      participation: {
        ...currentEleve.evaluations.participation,
        ...participation,
      },
      comportement: {
        ...currentEleve.evaluations.comportement,
        ...comportement,
      },
      autonomie: {
        ...currentEleve.evaluations.autonomie,
        ...autonomie,
      },
    },
  }

  const eleves = $eleves.get()
  const index = eleves.findIndex((e) => e.id === id)

  eleves[index] = currentEleve

  $eleves.set([...eleves])
}

export const updateAppreciationEleve = (id, appreciation) => {
  const eleves = $eleves.get()
  const index = eleves.findIndex((e) => e.id === id)

  if (index !== -1) {
    const updatedEleve = {
      ...eleves[index],
      appreciation: appreciation,
    }

    eleves[index] = updatedEleve
    $eleves.set([...eleves])
  }
}

export const updateNoteAppreciationEleve = (id, note) => {
  const eleves = $eleves.get()
  const index = eleves.findIndex((e) => e.id === id)
  if (index !== -1) {
    eleves[index] = {
      ...eleves[index],
      note_appreciation: note,
    }
    $eleves.set([...eleves])
  }
}
