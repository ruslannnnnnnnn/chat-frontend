import { useEffect, useRef } from 'react'
import socketApi from '../api/socket.api'

export const useSocketConnection = () => {
  const gatewayRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    gatewayRef.current = socketApi.createGatewayConnection()

    return () => {
      gatewayRef.current?.close()
    }
  }, [])

  return {
    socketGateway: gatewayRef.current,
  }
}
