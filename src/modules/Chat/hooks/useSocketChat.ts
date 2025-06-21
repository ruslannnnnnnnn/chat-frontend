import socketApi from '@/shared/api/socket.api'
import { useEffect } from 'react'

export const useSocketChat = () => {
	useEffect(() => {
		const ws = socketApi.ws

		ws.onmessage = () => {
			console.log('message1')
		}
	}, [])
}