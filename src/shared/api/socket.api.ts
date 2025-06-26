import { useSocketConnectionStore } from '../store/useSocketConnectionStore'

let ws: WebSocket

const createSocketConnection = (username?: string, onOpen?: (ws: WebSocket) => void) => {
  const { setSocketConnected, setConnectionError } = useSocketConnectionStore.getState()

  const baseUrl = import.meta.env.VITE_SOCKET_GATEWAY
  const url = username
    ? `${baseUrl}?name=${encodeURIComponent(username)}`
    : baseUrl

  ws = new WebSocket(url)

  ws.onopen = () => {
    setSocketConnected(true)
    setConnectionError(null)
    console.log('Connected to SocketGateway')
    onOpen?.(ws)
  }
  ws.onclose = (event) => {
    setSocketConnected(false)
    if (!event.wasClean) {
      setConnectionError('The connection was closed unexpectedly.')
    } else {
      setConnectionError('The connection was closed.')
    }
    console.log('Disconnected from the SocketGateway')
  }
  ws.onerror = () => {
    setSocketConnected(false)
    console.log('An error occurred while connecting to the SocketGateway')
    setConnectionError('Failed to connect to the SocketGateway.')
  }
}

const socketApi = {
  get ws() {
    if (!ws) {
      throw new Error('WebSocket not initialized')
    }
    return ws
  },
  createSocketConnection,
}

export default socketApi
