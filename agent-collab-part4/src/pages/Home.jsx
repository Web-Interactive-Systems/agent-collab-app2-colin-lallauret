import { Resizable } from '@/components/Resizable'
// import Agent from '@/features/agent/Agent'
import Eleve from '@/features/agent/Eleve'
import Chat from '@/features/chat/Chat'
import { Flex } from '@radix-ui/themes'

function Home() {
  return (
    <Flex
      gap='8'
      width='100%'
      height='100%'
      overflowX="hidden"
      >
      <Eleve />
      {/* <Agent /> */}

      <Resizable
        defaultSize={{ width: 350 }}
        class='resizable'
        style={{
          background: 'var(--focus-a2)',
          borderLeft: '1px solid var(--gray-9)',
          marginLeft: 'auto',
        }}
        enable={{
          top: false,
          right: false,
          bottom: false,
          left: true,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false,
        }}>
        <Chat />
      </Resizable>
    </Flex>
  )
}

export default Home
