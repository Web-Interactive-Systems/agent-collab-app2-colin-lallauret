import { Flex, IconButton, Separator } from '@radix-ui/themes'
import { useStore } from '@nanostores/react'
import { $selectedEleveId } from '@/store/store'
import EleveList from './EleveList'
import EleveForm from './EleveForm'
import Feedback from '../chat/Feedback'
import { Cross1Icon } from '@radix-ui/react-icons'

function Eleve() {
  const selectedEleveId = useStore($selectedEleveId)

  const handleClose = () => {
    $selectedEleveId.set(null)
  }

  return (
    <Flex
      gap='4'
      p='2'
      width='100%'
      height='calc(100vh - 42px)'>
      <EleveList isColumn={!!selectedEleveId} />
      {selectedEleveId && (
        <>
          <Separator
            orientation='vertical'
            size='4'
            mr='2'
          />
          <EleveForm />
          <Feedback />
          <IconButton
            variant='ghost'
            onClick={handleClose}>
            <Cross1Icon />
          </IconButton>
        </>
      )}
    </Flex>
  )
}

export default Eleve
