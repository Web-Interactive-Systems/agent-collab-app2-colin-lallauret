import {
  $eleves,
  addEleve,
  removeEleve,
  setSelectedEleve,
  $selectedEleveId,
} from '@/store/store'
import { useStore } from '@nanostores/react'
import { Pencil1Icon, Pencil2Icon, PlusIcon, TrashIcon } from '@radix-ui/react-icons'
import { Avatar, Box, Button, Card, Flex, Text, Tabs } from '@radix-ui/themes'
import { useState } from 'react'

function EleveList() {
  const selectedEleve = useStore($selectedEleveId)
  const eleves = useStore($eleves)
  const [filter, setFilter] = useState('all')

  const filteredEleves = eleves.filter((eleve) => {
    if (filter === 'all') return true
    if (filter === 'withAppreciation') return eleve.appreciation != null
    if (filter === 'withoutAppreciation') return eleve.appreciation == null
    return true
  })

  return (
    <Flex
      direction='column'
      gap='3'
      width='100%'>
      <Tabs.Root
        value={filter}
        onValueChange={setFilter}>
        <Tabs.List>
          <Tabs.Trigger value='all'>Tous</Tabs.Trigger>
          <Tabs.Trigger value='withAppreciation'>Avec appréciation</Tabs.Trigger>
          <Tabs.Trigger value='withoutAppreciation'>Sans appréciation</Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
      <Flex
        overflowY='auto'
        width='100%'>
        <Box
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fill, minmax(182px, 1fr))`,
            alignContent: 'flex-start',
            gap: 10,
            width: '100%',
            height: '100%',
            padding: 4,
          }}>
          <Card
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Button
              type='submit'
              onClick={() => addEleve()}
              style={{
                cursor: 'not-allowed',
              }}>
              <PlusIcon />
              Ajouter
            </Button>
          </Card>

          {filteredEleves.map((eleve) => {
            let background = ''
            let border = '0px solid var(--gray-6)'
            if (eleve.appreciation != null && selectedEleve !== eleve.id) {
              border = '2px solid var(--gray-5)'
            } else if (selectedEleve === eleve.id) {
              background = 'var(--accent-9)'
              border = '0px solid var(--gray-6)'
            }
            return (
              <Card
                key={eleve.id}
                style={{
                  width: '100%',
                  height: 'min-content',
                  background,
                  border,
                }}>
                <Flex align='center'>
                  <Box>
                    <Flex gap='1'>
                      <Avatar
                        size='3'
                        src={eleve.picture}
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
            )
          })}
        </Box>
      </Flex>
    </Flex>
  )
}

export default EleveList
