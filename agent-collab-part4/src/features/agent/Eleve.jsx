import { Flex, Separator } from '@radix-ui/themes'
import { useStore } from '@nanostores/react'
import { $selectedEleveId } from '@/store/store'
import EleveList from './EleveList'
import EleveForm from './EleveForm'

function Eleve() {
  const selectedEleveId = useStore($selectedEleveId)

  return (
    <Flex
      gap='4'
      p='2'
      width='100%'
      height='100%'>
      <EleveList />

      {selectedEleveId && (
        <>
          <Separator
            orientation='vertical'
            size='4'
            mr='2'
          />
          <EleveForm />
        </>
      )}
    </Flex>
  )
}

export default Eleve
