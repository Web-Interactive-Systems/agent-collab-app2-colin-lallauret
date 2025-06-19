import { atom } from 'nanostores'

export const $iaBaseUrlOverride = atom('')
export const $iaModelOverride = atom('')

export const updateIaBaseUrl = (url) => {
  $iaBaseUrlOverride.set(url || '')
}

export const updateIaModel = (model) => {
  $iaModelOverride.set(model || '')
}

export const getIaBaseUrl = () => {
  const override = $iaBaseUrlOverride.get()
  return override || import.meta.env.VITE_IA_BASE_URL
}

export const getIaModel = () => {
  const override = $iaModelOverride.get()
  return override || import.meta.env.VITE_IA_MODEL
}
