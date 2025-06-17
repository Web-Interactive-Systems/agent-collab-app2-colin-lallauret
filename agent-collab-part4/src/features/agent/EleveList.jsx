import {
  // $agents,
  // $selectedAgentId,
  // addAgent,
  // removeAgent,
  // setSelectedAgent,
  $eleves,
  addEleve,
  removeEleve,
  setSelectedEleve,
  $selectedEleveId,
} from '@/store/store'
import { useStore } from '@nanostores/react'
import { Pencil1Icon, Pencil2Icon, PlusIcon, TrashIcon } from '@radix-ui/react-icons'
import { Box, Button, Card, Flex, Text } from '@radix-ui/themes'

function EleveList() {
  // const agents = useStore($agents)
  const selectedEleve = useStore($selectedEleveId)

  const eleves = useStore($eleves)

  return (
    <Box
      width='100%'
      height='100%'
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        padding: 0,
        width: '200px',
      }}>
      <Card
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Button
          type='submit'
          onClick={() => addEleve()}>
          <PlusIcon />
          Ajouter
        </Button>
      </Card>

      {eleves.map((eleve) => (
        <Card
          key={eleve.id}
          style={{
            width: '100%',
            height: '100%',
            background: selectedEleve === eleve.id ? 'var(--focus-7)' : '',
          }}>
          <Flex
            gap='3'
            align='center'>
            <Box>
              <Text
                as='div'
                size='2'
                weight='bold'>
                {eleve.prenom} {eleve.nom}
              </Text>
              <Box
                width='142px'
                minHeight='40px'>
                <Text
                  as='div'
                  size='2'
                  color='gray'
                  wrap='wrap'>
                  Sexe: {eleve.sexe} <br />
                  Lecture: {eleve.matieres.lecture} <br />
                  Écriture: {eleve.matieres.ecriture} <br />
                  Math: {eleve.matieres.math}
                </Text>
              </Box>
            </Box>
            <Flex
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
              justify='end'
              gap='4'>
              <Button
                variant='ghost'
                onClick={() => setSelectedEleve(eleve.id)}>
                {selectedEleve === eleve.id ? <Pencil2Icon /> : <Pencil1Icon />}
              </Button>
              <Button
                variant='ghost'
                color='red'
                onClick={() => removeEleve(eleve.id)}>
                <TrashIcon />
              </Button>
            </Flex>
          </Flex>
        </Card>
      ))}
    </Box>
  )
}

export default EleveList
