import { Flex } from '@radix-ui/themes'
import ChatList from './ChatList'
import ChatPrompt from './ChatPrompt'

function Chat() {
  return (
    <Flex
      direction='column'
      gap='4'
      width='100%'
      height='calc(100vh - 62px)'
      p='1'>
      <ChatList />
      {/* <ChatPrompt /> */}
    </Flex>
  )
}

export default Chat
