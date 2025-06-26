import socketApi from '@/shared/api/socket.api'
import { useSocketConnectionStore } from '@/shared/store/useSocketConnectionStore'
import { useState, type FC } from 'react'

type Message = {
  id: string
  message: string
}

export const Chat: FC = () => {
  const socketConnected = useSocketConnectionStore((state) => state.socketConnected)

  const sendMessage = () => {
    const ws = socketApi.ws
    if (!ws) return
    ws.send('adam')
  }

  const [username, setUsername] = useState<string>('')
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', message: 'Hello1' },
    { id: '2', message: 'Hello2' },
  ])

  if (!socketConnected) {
    return (
      <div className='absolute outline outline-black rounded-2xl m-auto top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2'>
        <div className='flex flex-col p-5'>
          <div>Введите имя пользователя</div>
          <input
            className='w-[300px] h-[5vh] border outline-none border-black px-3'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={() => socketApi.createSocketConnection()} className='w-[80px] h-[3vh] bg-emerald-700 text-white cursor-pointer mt-1'>Connect</button>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-[10px] align-center items-center'>
      <div className='w-[900px] h-[90vh] outline outline-black mt-[20px] p-[10px] overflow-y-auto'>
        {messages.map((message: Message) => (
          <div key={message.id} className='my-[8px]'>
            <div>user1</div>
            <div className='inline-block max-w-[50%] outline outline-black break-words p-[5px]'>{message.message}</div>
          </div>
        ))}
      </div>

      <div className='flex gap-[10px]'>
        <input type='text' className='w-[300px] h-[5vh] border outline-none border-black px-3' />
        <button onClick={sendMessage} className='w-[80px] h-[5vh] bg-emerald-700 text-white cursor-pointer'>
          Send
        </button>
      </div>
    </div>
  )
}
