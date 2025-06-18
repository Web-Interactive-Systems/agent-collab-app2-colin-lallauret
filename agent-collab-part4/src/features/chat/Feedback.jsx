import { onAgent } from '@/actions/agent'
import { PlayIcon } from '@radix-ui/react-icons'
import { Flex, IconButton, TextArea } from '@radix-ui/themes'
import {
  $currentEleve,
  $messages,
  addMessage,
  updateMessages,
  $criteresEvaluation,
  $agents,
} from '@/store/store'
import { updateAppreciationEleve } from '@/store/eleveForm'
import { useStore } from '@nanostores/react'
import React, { useState } from 'react'

function constructCtxArray(originalArray) {
  const result = []
  if (originalArray.length > 3) result.push(originalArray.at(-3), originalArray.at(-2))
  if (originalArray.length > 1) result.push(originalArray[1])
  if (originalArray.length > 0) result.push(originalArray[0])
  return result
}

// Fonction pour nettoyer les balises <think> (même logique que dans json.js)
function cleanThinkTags(text = '') {
  return text.replace(/<think>[\s\S]*?<\/think>/gi, '')
}

function Feedback() {
  const currentEleve = useStore($currentEleve)
  const criteresEvaluation = useStore($criteresEvaluation)
  const agents = useStore($agents)
  const [isGenerating, setIsGenerating] = useState(false)

  const { participation, comportement, autonomie } = currentEleve.evaluations || {}

  const playDisable = !(
    participation?.part_1 != null &&
    participation?.part_2 != null &&
    participation?.part_3 != null &&
    comportement?.comp_1 != null &&
    comportement?.comp_2 != null &&
    comportement?.comp_3 != null &&
    autonomie?.auto_1 != null &&
    autonomie?.auto_2 != null &&
    autonomie?.auto_3 != null
  )

  // Fonction pour convertir les évaluations en texte en utilisant criteresEvaluation
  const convertEvaluationToText = (evaluations) => {
    let textDescription = "Évaluation de l'élève :\n\n"

    // Parcourir chaque catégorie (participation, comportement, autonomie)
    Object.keys(evaluations).forEach((categoryKey) => {
      const category = criteresEvaluation[categoryKey]
      const categoryEvaluations = evaluations[categoryKey]

      if (category && categoryEvaluations) {
        textDescription += `${category.titre.toUpperCase()} :\n`

        // Parcourir chaque question de la catégorie
        category.questions.forEach((question) => {
          const valeurReponse = categoryEvaluations[question.id]

          if (valeurReponse != null) {
            // Trouver le texte correspondant à la valeur
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

  // Fonction pour mettre à jour l'appréciation localement
  const handleAppreciationChange = (e) => {
    const newAppreciation = e.target.value
    updateAppreciationEleve(currentEleve.id, newAppreciation)
  }

  const onGenerateAppreciation = async () => {
    if (playDisable || isGenerating) return

    setIsGenerating(true)

    // Vider l'ancien contexte/historique des messages
    updateMessages([])

    // Convertir les évaluations en texte descriptif
    const evaluationText = convertEvaluationToText(currentEleve.evaluations)

    // Construire le nom complet de l'élève
    const nomComplet = [currentEleve.prenom, currentEleve.nom].filter(Boolean).join(' ')
    const eleveInfo = nomComplet || "l'élève"

    // Déterminer le genre pour l'accord grammatical
    const genre = currentEleve.sexe === 'F' ? 'féminin' : 'masculin'
    const articleDefini = currentEleve.sexe === 'F' ? 'cette élève' : 'cet élève'

    // Ajouter le message utilisateur avec les informations complètes de l'élève
    addMessage({
      role: 'user',
      content: `Génère une appréciation pour ${eleveInfo} (${
        currentEleve.sexe === 'F' ? 'fille' : 'garçon'
      }) basée sur ces évaluations :\n\n${evaluationText}`,
      id: Math.random().toString(),
    })

    const messages = $messages.get()
    const contextInputs = constructCtxArray(messages)

    try {
      // Utiliser les agents du store
      const steps = agents

      for (let i = 0, len = steps.length; i < len; i++) {
        const agent = steps[i]

        addMessage({
          role: 'assistant',
          content: `🔄 ${agent.title} en cours...`,
          id: Math.random().toString(),
          completed: false,
          agent: agent,
        })

        let cloned = $messages.get()

        // Construire le prompt avec les informations complètes de l'élève
        const promptWithStudentInfo = `Informations sur l'élève :
- Nom : ${eleveInfo}
- Sexe : ${currentEleve.sexe} (${genre})
- Instructions : Utilise les accords grammaticaux appropriés selon le genre dans toute l'appréciation.

${evaluationText}`

        // Appel de l'agent
        const stream = await onAgent({
          prompt: promptWithStudentInfo,
          agent,
          contextInputs,
        })

        // Traitement du stream
        for await (const part of stream) {
          let token = part.choices[0]?.delta?.content || ''

          // Nettoyer les balises <think> du token
          token = cleanThinkTags(token)

          const last = cloned.at(-1)

          // Remplacer le message "en cours" par le contenu réel au premier token
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

        // Marquer comme terminé et nettoyer le contenu final
        const last = cloned.at(-1)
        const cleanedContent = cleanThinkTags(last.content).trim()

        cloned[cloned.length - 1] = {
          ...last,
          content: cleanedContent,
          completed: true,
        }

        // Si c'est le dernier agent (Rédacteur Final), mettre à jour l'appréciation
        if (i === steps.length - 1) {
          updateAppreciationEleve(currentEleve.id, cleanedContent)
        }

        // Ajouter le prochain message assistant si ce n'est pas le dernier
        if (i !== steps.length - 1) {
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

      // Message de fin
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
      setIsGenerating(false)
    }
  }

  return (
    <>
      <Flex
        direction='column'
        gap='1'
        width='100%'
        justify='center'
        align='center'>
        <TextArea
          placeholder='Appréciation...'
          resize='vertical'
          size='2'
          value={(currentEleve?.appreciation || '').trim()}
          onChange={handleAppreciationChange}
          style={{
            width: '100%',
            minHeight: 150,
            minWidth: 300,
          }}
        />
      </Flex>

      <Flex
        justify='between'
        align='center'>
        <IconButton
          size='3'
          disabled={playDisable || isGenerating}
          onClick={onGenerateAppreciation}>
          <PlayIcon />
        </IconButton>
      </Flex>
    </>
  )
}

export default Feedback
