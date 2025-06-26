import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type State = {
  socketConnected: boolean
  connectionError: string | null
}

type Action = {
  setSocketConnected: (connect: boolean) => void
  setConnectionError: (error: string | null) => void
}

export const useSocketConnectionStore = create<State & Action>()(
  immer((set) => ({
    socketConnected: false,
    connectionError: null,
    setSocketConnected: (connect) => {
      set((state) => {
        state.socketConnected = connect
      })
    },
    setConnectionError: (error) => set({ connectionError: error }),
  })),
)
