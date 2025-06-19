import { atom } from 'nanostores'

export const $messages = atom([])

export const addMessage = (msg) => {
  const msgs = $messages.get()
  $messages.set([...msgs, msg])
}

export const updateMessages = (msgs) => {
  $messages.set(msgs)
}
