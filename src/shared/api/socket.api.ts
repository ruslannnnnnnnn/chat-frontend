import { useSocketConnectionStore } from '../store/useSocketConnectionStore'

const createSocketConnection = () => {
  const ws = new WebSocket(import.meta.env.VITE_SOCKET_GATEWAY)
  ws.onopen = () => {
    useSocketConnectionStore.getState().setSocketConnected(true)
    console.log('Connected to SocketGateway')
  }
  ws.onclose = () => {
    console.log('Disconnected from SocketGateway')
  }
  ws.onerror = () => {
    console.log('Error from SocketGateway')
  }
  return ws
}

const socketApi = {
  createSocketConnection,
}

export default socketApi
