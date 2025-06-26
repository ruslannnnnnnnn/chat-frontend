import socketApi from '@/shared/api/socket.api'
import { useSocketConnectionStore } from '@/shared/store/useSocketConnectionStore'
import { useEffect } from 'react'
import { useMessageStore, type ChatMessage } from '../store/useMessageStore'

export const useSocketChat = () => {
  const socketConnected = useSocketConnectionStore((state) => state.socketConnected)

  useEffect(() => {
    if (!socketConnected) return
    const ws = socketApi.ws

    ws.onmessage = (event) => {
      const message: ChatMessage = JSON.parse(event.data)
      useMessageStore.getState().setChatMessages(message)
    }

    return () => ws.close()
  }, [socketConnected])
}
