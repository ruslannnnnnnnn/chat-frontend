import { useSocketConnection } from '@/shared/hooks/useSocketConnection'
import { useState, type FC } from 'react'

type Message = {
  id: string
  message: string
}

export const Chat: FC = () => {
  useSocketConnection()

  const [messages, setMessages] = useState<Message[]>([
    { id: '1', message: 'Hello1' },
    { id: '2', message: 'Hello2' },
  ])

  return (
    <div className='flex flex-col gap-[10px] align-center items-center'>
      <div className='w-[900px] h-[90vh] outline outline-black mt-[20px] p-[10px] overflow-y-auto'>
        {messages.map((message: Message) => (
          <>
            <div className='my-[8px]'>
              <div>user1</div>
              <div className='inline-block max-w-[50%] outline outline-black break-words p-[5px]' key={message.id}>
                {message.message}
              </div>
            </div>
          </>
        ))}
      </div>

      <div className='flex gap-[10px]'>
        <input type='text' className='w-[300px] h-[5vh] border outline-none border-black px-3' />
        <button className='w-[80px] h-[5vh] bg-emerald-700 text-white cursor-pointer'>Send</button>
      </div>
    </div>
  )
}
