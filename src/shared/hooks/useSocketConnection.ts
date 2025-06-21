import { useRef, useCallback } from 'react'
import socketApi from '../api/socket.api'

export const useSocketConnection = () => {
  const socketRef = useRef<WebSocket | null>(null)

  const connect = useCallback(() => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) return

    socketRef.current = socketApi.createSocketConnection()
  }, [])

  const disconnect = useCallback(() => {
    socketRef.current?.close()
    socketRef.current = null
  }, [])

  return {
    connect,
    disconnect,
  }
}
