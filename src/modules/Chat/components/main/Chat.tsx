import socketApi from '@/shared/api/socket.api'
import { useSocketConnectionStore } from '@/shared/store/useSocketConnectionStore'
import { useState, type FC } from 'react'
import { useSocketChat } from '../../hooks/useSocketChat'
import { useMessageStore, type ChatMessage } from '../../store/useMessageStore'
import { ConnectToChat } from '../ConnectToChat'

export const Chat: FC = () => {
  //хук, принимающий сообщения
  useSocketChat()

  const socketConnected = useSocketConnectionStore((state) => state.socketConnected)
  const chatMessages = useMessageStore((state) => state.chatMessages)

  const [inputValue, setInputValue] = useState('')

  // отправка сообщений
  const sendMessage = () => {
    if (!inputValue) return
    const ws = socketApi.ws
    ws.send(inputValue)

    setInputValue('')
  }

  // компонент отправки username
  if (!socketConnected) {
    return <ConnectToChat />
  }

  return (
    <div className='flex flex-col gap-[10px] align-center items-center'>
      <div className='w-[900px] h-[90vh] outline outline-black mt-[20px] p-[10px] overflow-y-auto'>
        {chatMessages.map((message: ChatMessage, index) => (
          <div key={index.toString() + message.message.toString()} className='my-[8px]'>
            <div>{message.sender_name}</div>
            <div className='inline-block max-w-[50%] outline outline-black break-words p-[5px]'>{message.message}</div>
          </div>
        ))}
      </div>

      <div className='flex gap-[10px]'>
        <input
          type='text'
          value={inputValue}
          className='w-[300px] h-[5vh] border outline-none border-black px-3'
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              sendMessage()
            }
          }}
        />
        <button onClick={sendMessage} className='w-[80px] h-[5vh] bg-emerald-700 text-white cursor-pointer'>
          Send
        </button>
      </div>
    </div>
  )
}
