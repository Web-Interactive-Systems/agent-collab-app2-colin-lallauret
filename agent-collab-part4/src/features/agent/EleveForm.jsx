import EmojiPicker from '@/components/EmojiPicker'
import {
  $currentEleve,
  addEleve,
  updateCurrentEleve,
  $criteresEvaluation,
} from '@/store/store'
import { useStore } from '@nanostores/react'
import { CheckIcon } from '@radix-ui/react-icons'
import {
  Button,
  Flex,
  Heading,
  Select,
  Slider,
  Text,
  TextArea,
  TextField,
} from '@radix-ui/themes'

const EleveForm = () => {
  const currentEleve = useStore($currentEleve)
  const criteresEval = useStore($criteresEvaluation)

  const onChange = (key, value) => {
    updateCurrentEleve({ [key]: value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', currentEleve)
    addEleve(currentEleve)
  }

  console.log('currentEleve', currentEleve)

  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
        width: 450,
      }}
      onSubmit={onSubmit}>
      <Flex
        direction='column'
        gap='1'>
        <label htmlFor={'nom'}>Nom</label>
        <TextField.Root
          placeholder='Nom...'
          value={currentEleve.nom || ''}
          onChange={(e) => onChange('nom', e.target.value)}
          resize='vertical'
        />
      </Flex>

      <Flex
        direction='column'
        gap='1'>
        <label htmlFor={'prenom'}>Prénom</label>
        <TextField.Root
          placeholder='Prénom...'
          value={currentEleve.prenom || ''}
          onChange={(e) => onChange('prenom', e.target.value)}
          resize='vertical'
        />
      </Flex>

      <Flex direction='column'>
        {Object.keys(criteresEval).map((cat) => (
          <Flex
            direction='column'
            key={cat}>
            <Heading>{criteresEval[cat].titre}</Heading>

            <Flex direction='column'>
              {criteresEval[cat].questions.map((item) => (
                <Flex
                  direction='column'
                  key={item.id}>
                  <Text>{item.question}</Text>

                  {item.reponses.map((res) => (
                    <Flex key={res.valeur}>
                      <Text>{res.texte}</Text>
                    </Flex>
                  ))}
                </Flex>
              ))}
            </Flex>
          </Flex>
        ))}
      </Flex>

      {/* Submit action, see onSubmit in the <form> tag above */}
      <Flex justify='end'>
        <Button type='submit'>
          <CheckIcon />
          Sauver
        </Button>
      </Flex>
    </form>
  )
}

export default EleveForm
