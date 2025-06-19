import { useState } from 'react'
import { Resizable } from '@/components/Resizable'
// import Agent from '@/features/agent/Agent'
import Eleve from '@/features/agent/Eleve'
import Chat from '@/features/chat/Chat'
import { Flex, IconButton } from '@radix-ui/themes'
import { PinLeftIcon, PinRightIcon } from '@radix-ui/react-icons'

function Home() {
  const [showChat, setShowChat] = useState(true)

  const chatWidth = 350
  const closedWidth = 60

  return (
    <Flex
      gap='0'
      width='100%'
      height='100%'
      overflowX='hidden'>
      <Eleve />
      {/* <Agent /> */}

      <IconButton
        style={{
          position: 'fixed',
          top: 52,
          right: 24,
          zIndex: 1000,
        }}
        variant='solid'
        onClick={() => setShowChat((v) => !v)}
        aria-label={showChat ? 'Close chat' : 'Open chat'}>
        {showChat ? <PinRightIcon /> : <PinLeftIcon />}
      </IconButton>

      <div
        style={{
          flexBasis: showChat ? chatWidth : closedWidth,
          minWidth: showChat ? chatWidth : closedWidth,
          maxWidth: showChat ? chatWidth : closedWidth,
          marginLeft: 'auto',
          height: '100%',
          transition:
            'flex-basis 0.4s cubic-bezier(.4,1.2,.4,1), min-width 0.4s cubic-bezier(.4,1.2,.4,1), max-width 0.4s cubic-bezier(.4,1.2,.4,1)',
          overflow: 'hidden',
          borderLeft: showChat ? '1px solid var(--gray-9)' : 'none',
          background: 'none',
          position: 'relative',
          display: 'flex',
        }}>
        {showChat ? (
          <Resizable
            defaultSize={{ width: chatWidth }}
            class='resizable'
            style={{
              width: '100%',
              height: '100%',
              background: 'none',
              border: 'none',
              position: 'relative',
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
        ) : null}
      </div>
    </Flex>
  )
}

export default Home
