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
  const eleve = $currentEleve.get()
  $currentEleve.set({
    ...eleve,
    ...dataForm,
  })
}
