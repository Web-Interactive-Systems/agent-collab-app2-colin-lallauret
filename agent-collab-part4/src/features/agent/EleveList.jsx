import {
  $eleves,
  addEleve,
  removeEleve,
  setSelectedEleve,
  $selectedEleveId,
} from '@/store/store'
import { useStore } from '@nanostores/react'
import { Pencil1Icon, Pencil2Icon, PlusIcon, TrashIcon } from '@radix-ui/react-icons'
import { Avatar, Box, Button, Card, Flex, Text } from '@radix-ui/themes'

function EleveList({ isColumn = false }) {
  // const agents = useStore($agents)
  const selectedEleve = useStore($selectedEleveId)

  const eleves = useStore($eleves)

  const containerStyle = isColumn
    ? {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        width: '200px',
        height: '100%',
        padding: 0,
      }
    : {
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(182px, 1fr))`,
        alignContent: 'flex-start',
        gap: 10,
        width: '100%',
        height: '100%',
        padding: 0,
      }

  return (
    <Box style={containerStyle}>
      <Card
        style={{
          width: '100%',
          height: 'min-content',
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
            height: 'min-content',
            background:
              eleve.appreciation != null
                ? '#3eddaa'
                : selectedEleve === eleve.id
                ? 'var(--focus-7)'
                : '',
          }}>
          <Flex
            gap='3'
            align='center'>
            <Box>
              <Flex gap='1'>
                <Avatar
                  size='3'
                  src={`https://i.pravatar.cc/60?img=${eleve.id}`}
                  radius='full'
                  fallback='T'
                />
                <Text
                  as='div'
                  size='2'
                  weight='bold'>
                  {eleve.prenom} {eleve.nom} {eleve.sexe === 'M' ? '♂️' : '♀️'}
                </Text>
              </Flex>
              <Box
                width='142px'
                minHeight='40px'>
                <Text
                  as='div'
                  size='2'
                  color='gray'
                  wrap='wrap'>
                  Lecture: {eleve.matieres.lecture}/5 <br />
                  Écriture: {eleve.matieres.ecriture}/5 <br />
                  Math: {eleve.matieres.math}/5
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
