import { atom, computed } from 'nanostores'
import { $agents } from './agents'

export const $selectedChatAgents = atom(['1', '2', '3', '4', '5'])

export const $chatAgents = computed([$selectedChatAgents, $agents], (ids, agents) => {
  return ids.map((id) => agents.find((e) => e.id === id))
})

export const selectChatAgent = (checked, id) => {
  const selected = $selectedChatAgents.get()
  if (checked) {
    $selectedChatAgents.set([...selected, id])
  } else {
    $selectedChatAgents.set(selected.filter((e) => e !== id))
  }
}

export const setSelectChatAgents = (ids) => {
  $selectedChatAgents.set(ids)
}
