import { useEffect, useRef } from 'react'
import { Markdown } from '@/components/Markdown'
import { $messages } from '@/store/store'
import { useStore } from '@nanostores/react'
import { Box, Flex } from '@radix-ui/themes'

function ChatList() {
  const messages = useStore($messages)
  const containerRef = useRef(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [messages])

  return (
    <Flex
      ref={containerRef}
      direction='column'
      gap='2'
      style={{ height: 'calc(100vh)', overflowY: 'auto' }}>
      {messages.map((msg) => (
        <Flex key={`message-${msg.id}`}>
          {msg.role === 'assistant' ? (
            <Flex
              style={{
                background: 'var(--accent-2)',
                border: '1px solid var(--accent-4)',
                padding: '4px 8px',
                borderRadius: 8,
              }}>
              <Box></Box>
              <Markdown content={msg.content || ''} />
            </Flex>
          ) : (
            <Flex
              style={{
                background: 'var(--accent-3)',
                border: '1px solid var(--accent-4)',
                padding: '4px 8px',
                borderRadius: 8,
                marginLeft: 24,
              }}>
              <Box></Box>
              <Markdown content={msg.content || ''} />
            </Flex>
          )}
        </Flex>
      ))}
    </Flex>
  )
}

export default ChatList
