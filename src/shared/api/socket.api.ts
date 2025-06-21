const createGatewayConnection = () => {
  const ws = new WebSocket(import.meta.env.VITE_SOCKET_GATEWAY)
  ws.onopen = () => {
    console.log('Connected to SocketGateway')
  }
  ws.onclose = () => {
    console.log('Disconnected from SocketGateway')
  }
  return ws
}

const socketApi = {
  createGatewayConnection
}

export default socketApi
