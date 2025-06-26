import type { FC } from 'react'
import socketApi from '@/shared/api/socket.api'
import { useSocketConnectionStore } from '@/shared/store/useSocketConnectionStore'
import { useUserStore } from '../store/useUserStore'

export const ConnectToChat: FC = () => {
  const connectionError = useSocketConnectionStore((state) => state.connectionError)
  const { username, setUsername } = useUserStore()

  // установка соединения и отправка первого сообщения с подключением пользователя
  const handleConnect = () => {
    if (!username) return

    socketApi.createSocketConnection(username, (ws) => {
      ws.send(`${username} connected`)
    })
  }

  return (
    <div className='absolute outline outline-black rounded-2xl m-auto top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2'>
      <div className='flex flex-col p-5'>
        <div>Введите имя пользователя</div>
        <input
          className='w-[300px] h-[5vh] border outline-none border-black px-3'
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleConnect()
            }
          }}
        />
        <button onClick={handleConnect} className='w-[80px] h-[3vh] bg-emerald-700 text-white cursor-pointer mt-1'>
          Connect
        </button>
        <div>{connectionError}</div>
      </div>
    </div>
  )
}
