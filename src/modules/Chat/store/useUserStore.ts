import { create } from 'zustand'

type State = {
  username: string
}

type Action = {
  setUsername: (username: string) => void
}

export const useUserStore = create<State & Action>((set) => ({
  username: '',
  setUsername: (username) => set({ username }),
}))