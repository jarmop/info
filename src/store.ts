import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface State {
  activeBox: string
  setActiveBox: (activeBox: string) => void
  visibleData: string[]
  addVisibleData: (name: string) => void
  removeVisibleData: (name: string) => void
  mode: string
  setMode: (mode: string) => void
}

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      activeBox: '',
      setActiveBox: (activeBox: string) => set({ activeBox }),
      visibleData: [
        'MySQL',
        'Netscape Navigator',
        'PHP',
        'JavaScript',
        'Java',
        'IMDB',
        'Internet Explorer',
      ],
      addVisibleData: (name) =>
        set(
          !get().visibleData.includes(name)
            ? {
              visibleData: [...get().visibleData, name],
            }
            : get(),
        ),
      removeVisibleData: (name) =>
        set({
          visibleData: get().visibleData.filter((n) => n !== name),
        }),
      mode: 'timeline',
      setMode: (mode) => set({ mode }),
    }),
    {
      name: 'foo',
    },
  ),
)

export function useActiveBox() {
  return {
    activeBox: useStore((state) => state.activeBox),
    setActiveBox: useStore((state) => state.setActiveBox),
  }
}

export function useVisibleData() {
  return {
    visibleData: useStore((state) => state.visibleData),
    addVisibleData: useStore((state) => state.addVisibleData),
    removeVisibleData: useStore((state) => state.removeVisibleData),
  }
}

export function useMode() {
  return {
    mode: useStore((state) => state.mode),
    setMode: useStore((state) => state.setMode),
  }
}
