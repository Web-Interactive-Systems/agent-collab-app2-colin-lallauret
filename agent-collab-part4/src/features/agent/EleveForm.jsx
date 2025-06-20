import {
  $currentEleve,
  addEleve,
  updateCurrentEleve,
  $criteresEvaluation,
  onGenerateAppreciation,
} from '@/store/store'
import { useStore } from '@nanostores/react'
import { ArrowRightIcon, PlayIcon, RocketIcon } from '@radix-ui/react-icons'
import {
  Avatar,
  Blockquote,
  Button,
  Flex,
  Heading,
  IconButton,
  RadioGroup,
  Strong,
  Tabs,
  Text,
} from '@radix-ui/themes'
import React from 'react'
import { AgentMenu } from '../chat/AgentMenu'
import { AgentSelect } from '../chat/AgentSelect'

const EleveForm = () => {
  const currentEleve = useStore($currentEleve)
  const criteresEval = useStore($criteresEvaluation)

  const onChange = (eleveId, cat, evalId, value) => {
    const wasUnanswered = currentEleve.evaluations?.[cat]?.[evalId] == null
    updateCurrentEleve({
      id: eleveId,
      [cat]: {
        [evalId]: value,
      },
    })

    const allAnswered = criteresEval[cat].questions.every(
      (item) =>
        (cat === activeTab && item.id === evalId
          ? value
          : currentEleve.evaluations?.[cat]?.[item.id]) != null,
    )

    if (wasUnanswered && allAnswered) {
      const currentTabIndex = tabKeys.indexOf(cat)
      if (currentTabIndex < tabKeys.length - 1) {
        setActiveTab(tabKeys[currentTabIndex + 1])
      }
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    addEleve(currentEleve)
  }

  const [activeTab, setActiveTab] = React.useState(Object.keys(criteresEval)[0])

  const tabKeys = Object.keys(criteresEval)
  const currentTabIndex = tabKeys.indexOf(activeTab)
  const isLastTab = currentTabIndex === tabKeys.length - 1

  const goToNextTab = () => {
    if (!isLastTab) {
      setActiveTab(tabKeys[currentTabIndex + 1])
    }
  }

  const isLastTabComplete = criteresEval[activeTab]?.questions.every(
    (item) => currentEleve.evaluations?.[activeTab]?.[item.id] != null,
  )

  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
        width: '100%',
      }}
      onSubmit={onSubmit}>
      <Flex
        direction='column'
        gap='1'>
        <Blockquote
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
          <Avatar src={currentEleve.picture} />
          <Heading>
            {currentEleve.prenom} {currentEleve.nom}
          </Heading>
        </Blockquote>
      </Flex>

      <Flex
        direction='column'
        gap='32px'
        style={{
          height: '100%',
          overflowY: 'auto',
        }}>
        <Tabs.Root
          value={activeTab}
          onValueChange={setActiveTab}>
          <Tabs.List>
            {tabKeys.map((cat) => {
              const allAnswered = criteresEval[cat].questions.every(
                (item) => currentEleve.evaluations?.[cat]?.[item.id] != null,
              )
              return (
                <Tabs.Trigger
                  key={cat}
                  value={cat}
                  style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {criteresEval[cat].titre}
                  <span style={{ marginLeft: 6 }}>
                    {allAnswered ? (
                      <svg
                        width='18'
                        height='18'
                        viewBox='0 0 18 18'
                        style={{ verticalAlign: 'middle' }}>
                        <rect
                          x='2'
                          y='2'
                          width='14'
                          height='14'
                          rx='3'
                          fill='#4caf50'
                          stroke='#4caf50'
                          strokeWidth='2'
                        />
                        <polyline
                          points='5,10 8,13 13,6'
                          fill='none'
                          stroke='#fff'
                          strokeWidth='2'
                        />
                      </svg>
                    ) : (
                      <svg
                        width='18'
                        height='18'
                        viewBox='0 0 18 18'
                        style={{ verticalAlign: 'middle' }}>
                        <rect
                          x='2'
                          y='2'
                          width='14'
                          height='14'
                          rx='3'
                          fill='none'
                          stroke='#aaa'
                          strokeWidth='2'
                        />
                      </svg>
                    )}
                  </span>
                </Tabs.Trigger>
              )
            })}
          </Tabs.List>
          {tabKeys.map((cat) => (
            <Tabs.Content
              key={cat}
              value={cat}>
              <Flex
                direction='column'
                gap='4'>
                {criteresEval[cat].questions.map((item) => (
                  <RadioGroup.Root
                    direction='column'
                    key={item.id}
                    value={currentEleve.evaluations[cat][item.id]}
                    onValueChange={(valeur) =>
                      onChange(currentEleve.id, cat, item.id, valeur)
                    }>
                    <Strong style={{ paddingTop: '10px' }}>{item.question}</Strong>
                    {item.reponses.map((res) => (
                      <RadioGroup.Item
                        key={res.valeur}
                        value={res.valeur}>
                        {res.texte}
                      </RadioGroup.Item>
                    ))}
                  </RadioGroup.Root>
                ))}
                {!isLastTab && activeTab === cat && (
                  <Button
                    type='button'
                    style={{ marginTop: 16, alignSelf: 'flex-end' }}
                    onClick={goToNextTab}>
                    Continuer
                    <ArrowRightIcon />
                  </Button>
                )}
                {isLastTab && activeTab === cat && (
                  <Button
                    type='button'
                    style={{ marginTop: 16, alignSelf: 'flex-end' }}
                    onClick={onGenerateAppreciation}
                    disabled={!isLastTabComplete}>
                    Générer
                    <PlayIcon />
                  </Button>
                )}
              </Flex>
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </Flex>
    </form>
  )
}

export default EleveForm
