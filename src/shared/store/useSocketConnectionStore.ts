import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type State = {
  socketConnected: boolean
}

type Action = {
  setSocketConnected: (connect: boolean) => void
}

export const useSocketConnectionStore = create<State & Action>()(
  immer((set) => ({
    socketConnected: false,
    setSocketConnected: (connect) => {
      set((state) => {
        state.socketConnected = connect
      })
    },
  })),
)
