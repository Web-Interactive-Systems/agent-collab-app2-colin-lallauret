import {
  MoonIcon,
  RocketIcon,
  DrawingPinFilledIcon,
  GearIcon,
  BackpackIcon,
  FrameIcon,
} from '@radix-ui/react-icons'
import { Button, Flex, Dialog, Text, TextField } from '@radix-ui/themes'
import { Link } from 'raviger'
import { useStore } from '@nanostores/react'
import {
  $iaBaseUrlOverride,
  $iaModelOverride,
  updateIaBaseUrl,
  updateIaModel,
} from '@/store/settings'
import { useState } from 'react'

export function Header() {
  const baseUrlOverride = useStore($iaBaseUrlOverride)
  const modelOverride = useStore($iaModelOverride)

  const [tempBaseUrl, setTempBaseUrl] = useState(baseUrlOverride)
  const [tempModel, setTempModel] = useState(modelOverride)

  const handleSave = () => {
    updateIaBaseUrl(tempBaseUrl.trim())
    updateIaModel(tempModel.trim())
  }

  return (
    <Flex style={{ borderBottom: '1px solid #e0e0e0', height: 42, width: '100vw' }}>
      <Flex
        justify='between'
        align='center'
        gap='3'
        width='100%'
        margin='0 auto'
        px='5'>
        <Flex gap='6'>
          <Link
            href='/'
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 8,
            }}>
            <RocketIcon
              height='22'
              width='22'
            />
            AppréciAI
          </Link>

          <Link
            href='/stats'
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 8,
            }}>
            <FrameIcon
              height='22'
              width='22'
            />
            Statistiques
          </Link>
        </Flex>

        <Flex gap='6'>
          <Link href='/agents'>
            <DrawingPinFilledIcon
              height='22'
              width='22'
            />
          </Link>
        </Flex>

        <Flex
          justify='center'
          align='center'
          direction='row'
          gap='5'>
          <Dialog.Root>
            <Dialog.Trigger>
              <Button
                variant='ghost'
                size='4'>
                <GearIcon
                  height='22'
                  width='22'
                />
              </Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth='450px'>
              <Dialog.Title>Paramètres IA</Dialog.Title>
              <Dialog.Description
                size='2'
                mb='4'>
                Laissez vide pour utiliser les valeurs par défaut du .env
              </Dialog.Description>

              <Flex
                direction='column'
                gap='3'>
                <label>
                  <Text
                    as='div'
                    size='2'
                    mb='1'
                    weight='bold'>
                    URL de base (optionnel)
                  </Text>
                  <TextField.Root
                    value={tempBaseUrl}
                    onChange={(e) => setTempBaseUrl(e.target.value)}
                    placeholder={`Par défaut: ${import.meta.env.VITE_IA_BASE_URL}`}
                  />
                </label>

                <label>
                  <Text
                    as='div'
                    size='2'
                    mb='1'
                    weight='bold'>
                    Modèle (optionnel)
                  </Text>
                  <TextField.Root
                    value={tempModel}
                    onChange={(e) => setTempModel(e.target.value)}
                    placeholder={`Par défaut: ${import.meta.env.VITE_IA_MODEL}`}
                  />
                </label>
              </Flex>

              <Flex
                gap='3'
                mt='4'
                justify='end'>
                <Dialog.Close>
                  <Button
                    variant='soft'
                    color='gray'>
                    Annuler
                  </Button>
                </Dialog.Close>
                <Dialog.Close>
                  <Button onClick={handleSave}>Sauvegarder</Button>
                </Dialog.Close>
              </Flex>
            </Dialog.Content>
          </Dialog.Root>
        </Flex>
      </Flex>
    </Flex>
  )
}
