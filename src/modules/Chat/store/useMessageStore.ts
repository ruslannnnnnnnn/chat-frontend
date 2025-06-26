import { create } from 'zustand'

export type ChatMessage = {
  type?: string
  sender_name: string
  message: string
}

type State = {
  chatMessages: ChatMessage[]
}

type Action = {
  setChatMessages: (message: ChatMessage) => void
}

export const useMessageStore = create<State & Action>((set) => ({
  chatMessages: [],
  setChatMessages: (message) => set((state) => ({ chatMessages: [...state.chatMessages, message] })),
}))
