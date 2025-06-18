import {
  $currentEleve,
  addEleve,
  updateCurrentEleve,
  $criteresEvaluation,
} from '@/store/store'
import { useStore } from '@nanostores/react'
import { Flex, Heading, RadioGroup, Strong, Text } from '@radix-ui/themes'

const EleveForm = () => {
  const currentEleve = useStore($currentEleve)
  const criteresEval = useStore($criteresEvaluation)

  const onChange = (eleveId, cat, evalId, value) => {
    updateCurrentEleve({
      id: eleveId,
      [cat]: {
        [evalId]: value,
      },
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    // console.log('Form submitted:', currentEleve)
    addEleve(currentEleve)
  }

  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
        width: '100%',
      }}
      onSubmit={onSubmit}>
      {/* {JSON.stringify(currentEleve)} */}

      <Flex
        direction='column'
        gap='1'>
        <Heading>
          {currentEleve.prenom} {currentEleve.nom}
        </Heading>
      </Flex>

      <Flex
        direction='column'
        gap='32px'
        style={{
          height: '100%',
          overflowY: 'auto',
        }}>
        {Object.keys(criteresEval).map((cat) => (
          <Flex
            direction='column'
            key={cat}>
            <Heading size='5'>{criteresEval[cat].titre}</Heading>

            <Flex direction='column'>
              {criteresEval[cat].questions.map((item) => (
                <RadioGroup.Root
                  direction='column'
                  key={item.id}
                  value={currentEleve.evaluations[cat][item.id]}
                  onValueChange={(valeur) =>
                    onChange(currentEleve.id, cat, item.id, valeur)
                  }>
                  <Strong
                    style={{
                      paddingTop: '10px',
                    }}>
                    {item.question}
                  </Strong>
                  {item.reponses.map((res) => (
                    <RadioGroup.Item value={res.valeur}>{res.texte}</RadioGroup.Item>
                  ))}
                </RadioGroup.Root>
              ))}
            </Flex>
          </Flex>
        ))}
      </Flex>
    </form>
  )
}

export default EleveForm
