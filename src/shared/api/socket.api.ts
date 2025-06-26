import { useSocketConnectionStore } from '../store/useSocketConnectionStore'

let ws: WebSocket | null = null

const createSocketConnection = () => {
  ws = new WebSocket(import.meta.env.VITE_SOCKET_GATEWAY)
  ws.onopen = () => {
    useSocketConnectionStore.getState().setSocketConnected(true)
    console.log('Connected to SocketGateway')
  }
  ws.onclose = () => {
    useSocketConnectionStore.getState().setSocketConnected(false)
    console.log('Disconnected from SocketGateway')
  }
  ws.onerror = () => {
    useSocketConnectionStore.getState().setSocketConnected(false)
    console.log('Error from SocketGateway')
  }
}

const socketApi = {
  get ws() {
    return ws
  },
  createSocketConnection,
}

export default socketApi
