import { MoonIcon, RocketIcon, DrawingPinFilledIcon, GearIcon } from '@radix-ui/react-icons'
import { Button, Flex } from '@radix-ui/themes'
import { Link } from 'raviger'

export function Header() {
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
          <Button
            variant='ghost'
            size='4'>
            <GearIcon
              height='22'
              width='22'
            />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
