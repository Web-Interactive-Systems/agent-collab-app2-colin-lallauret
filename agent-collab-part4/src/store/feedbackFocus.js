// store/feedbackFocus.js
import { atom } from 'nanostores'

export const $isFeedbackFocused = atom(false)

export const focusFeedback = () => {
  $isFeedbackFocused.set(true)
}

export const blurFeedback = () => {
  $isFeedbackFocused.set(false)
}
