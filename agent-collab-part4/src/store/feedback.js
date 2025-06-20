import { atom } from 'nanostores'
import { onAgent } from '@/actions/agent'
import {
  $currentEleve,
  $messages,
  addMessage,
  updateMessages,
  $criteresEvaluation,
  $agents,
} from '@/store/store'
import { updateAppreciationEleve } from '@/store/eleveForm'
import { $selectedChatAgents } from '@/store/chatAgents'

export const $isGeneratingAppreciation = atom(false)

function constructCtxArray(originalArray) {
  const result = []
  if (originalArray.length > 3) result.push(originalArray.at(-3), originalArray.at(-2))
  if (originalArray.length > 1) result.push(originalArray[1])
  if (originalArray.length > 0) result.push(originalArray[0])
  return result
}

function cleanThinkTags(text = '') {
  return text.replace(/<think>[\s\S]*?<\/think>/gi, '')
}

function convertEvaluationToText(evaluations) {
  const criteresEvaluation = $criteresEvaluation.get()
  let textDescription = "Évaluation de l'élève :\n\n"

  Object.keys(evaluations).forEach((categoryKey) => {
    const category = criteresEvaluation[categoryKey]
    const categoryEvaluations = evaluations[categoryKey]

    if (category && categoryEvaluations) {
      textDescription += `${category.titre.toUpperCase()} :\n`

      category.questions.forEach((question) => {
        const valeurReponse = categoryEvaluations[question.id]

        if (valeurReponse != null) {
          const reponseObj = question.reponses.find((r) => r.valeur === valeurReponse)
          const texteReponse = reponseObj ? reponseObj.texte : 'Non défini'
          textDescription += `- ${question.question} : ${texteReponse}\n`
        }
      })

      textDescription += '\n'
    }
  })

  return textDescription
}

export function isEvaluationComplete(currentEleve) {
  const { participation, comportement, autonomie } = currentEleve.evaluations || {}

  return !(
    participation?.part_1 == null ||
    participation?.part_2 == null ||
    participation?.part_3 == null ||
    comportement?.comp_1 == null ||
    comportement?.comp_2 == null ||
    comportement?.comp_3 == null ||
    autonomie?.auto_1 == null ||
    autonomie?.auto_2 == null ||
    autonomie?.auto_3 == null
  )
}

export async function onGenerateAppreciation() {
  const currentEleve = $currentEleve.get()
  const allAgents = $agents.get()
  const selectedIds = $selectedChatAgents.get()
  const agents = selectedIds
    .map((id) => allAgents.find((a) => a.id === id))
    .filter(Boolean)
  const isGenerating = $isGeneratingAppreciation.get()

  if (!isEvaluationComplete(currentEleve) || isGenerating) return

  $isGeneratingAppreciation.set(true)

  try {
    updateMessages([])

    const evaluationText = convertEvaluationToText(currentEleve.evaluations)

    const nomComplet = [currentEleve.prenom, currentEleve.nom].filter(Boolean).join(' ')
    const eleveInfo = nomComplet || "l'élève"

    const genre = currentEleve.sexe === 'F' ? 'féminin' : 'masculin'

    addMessage({
      role: 'user',
      content: `Génère une appréciation pour ${eleveInfo} (${
        currentEleve.sexe === 'F' ? 'fille' : 'garçon'
      }) basée sur ces évaluations :\n\n${evaluationText}`,
      id: Math.random().toString(),
    })

    const messages = $messages.get()
    const contextInputs = constructCtxArray(messages)

    for (let i = 0, len = agents.length; i < len; i++) {
      const agent = agents[i]

      addMessage({
        role: 'assistant',
        content: `🔄 ${agent.title} en cours...`,
        id: Math.random().toString(),
        completed: false,
        agent: agent,
      })

      let cloned = $messages.get()

      const promptWithStudentInfo = `Informations sur l'élève :
- Nom : ${eleveInfo}
- Sexe : ${currentEleve.sexe} (${genre})
- Instructions : Utilise les accords grammaticaux appropriés selon le genre dans toute l'appréciation.

${evaluationText}`

      const stream = await onAgent({
        prompt: promptWithStudentInfo,
        agent,
        contextInputs,
      })

      for await (const part of stream) {
        let token = part.choices[0]?.delta?.content || ''

        token = cleanThinkTags(token)

        const last = cloned.at(-1)

        if (last.content.includes('🔄') && token) {
          cloned[cloned.length - 1] = {
            ...last,
            content: token,
          }
        } else {
          cloned[cloned.length - 1] = {
            ...last,
            content: cleanThinkTags(last.content + token),
          }
        }

        updateMessages([...cloned])
      }

      const last = cloned.at(-1)
      const cleanedContent = cleanThinkTags(last.content).trim()

      cloned[cloned.length - 1] = {
        ...last,
        content: cleanedContent,
        completed: true,
      }

      if (i === agents.length - 1) {
        updateAppreciationEleve(currentEleve.id, cleanedContent)
      }

      if (i !== agents.length - 1) {
        cloned = [
          ...cloned,
          {
            role: 'assistant',
            content: '',
            id: Math.random().toString(),
            completed: false,
          },
        ]
      }

      updateMessages([...cloned])
    }

    addMessage({
      role: 'assistant',
      content: '✅ Appréciation générée avec succès !',
      id: Math.random().toString(),
      completed: true,
    })
  } catch (error) {
    addMessage({
      role: 'assistant',
      content: `❌ Erreur lors de la génération: ${error.message}`,
      id: Math.random().toString(),
      completed: true,
    })
  } finally {
    $isGeneratingAppreciation.set(false)
  }
}

export function updateAppreciationFromEditor(eleveId, htmlContent) {
  updateAppreciationEleve(eleveId, htmlContent)
}
