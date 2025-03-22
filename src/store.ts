import { create } from 'zustand'

interface State {
  activeBox: string
  setActiveBox: (activeBox: string) => void
  visibleData: string[]
  addVisibleData: (name: string) => void
  removeVisibleData: (name: string) => void
  mode: string
  setMode: (mode: string) => void
}

export const useStore = create<State>((set) => ({
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
    set((state) =>
      !state.visibleData.includes(name)
        ? {
          visibleData: [...state.visibleData, name],
        }
        : state
    ),
  removeVisibleData: (name) =>
    set((state) => ({
      visibleData: state.visibleData.filter((n) => n !== name),
    })),
  mode: 'timeline',
  setMode: (mode) => set({ mode }),
}))

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
