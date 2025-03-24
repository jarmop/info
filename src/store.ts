import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import rawData from './assets/data.json' with { type: 'json' }
import { useMemo } from 'react'
import { sort } from './helpers.ts'

export type Datum = typeof rawData[number]

interface State {
  activeBox: string
  setActiveBox: (activeBox: string) => void
  visibleNames: string[]
  addVisibleNames: (name: string) => void
  removeVisibleNames: (name: string) => void
  mode: string
  setMode: (mode: string) => void
  data: Datum[]
  setData: (data: Datum[]) => void
  addData: (datum: Datum) => void
  duplicateDatum: (name: string) => void
}

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      activeBox: '',
      setActiveBox: (activeBox: string) => set({ activeBox }),
      visibleNames: [
        'MySQL',
        'Netscape Navigator',
        'PHP',
        'JavaScript',
        'Java',
        'IMDB',
        'Internet Explorer',
      ],
      addVisibleNames: (name) =>
        set(
          !get().visibleNames.includes(name)
            ? {
              visibleNames: [...get().visibleNames, name],
            }
            : get(),
        ),
      removeVisibleNames: (name) =>
        set({
          visibleNames: get().visibleNames.filter((n) => n !== name),
        }),
      mode: 'timeline',
      setMode: (mode) => set({ mode }),
      data: rawData,
      setData: (data) => set({ data }),
      addData: (datum) => set({ data: [...get().data, datum] }),
      duplicateDatum: (name) => {
        const data = get().data
        const itemToDuplicate = data.find((d) => d.name === name)
        if (!itemToDuplicate) {
          return
        }

        const newItem = { ...itemToDuplicate, name: 'New item ' + Date.now() }

        set({
          data: [...data, newItem],
          visibleNames: [...get().visibleNames, newItem.name],
        })
      },
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

export function useVisibleNames() {
  return {
    visibleNames: useStore((state) => state.visibleNames),
    addVisibleNames: useStore((state) => state.addVisibleNames),
    removeVisibleNames: useStore((state) => state.removeVisibleNames),
  }
}

export function useMode() {
  return {
    mode: useStore((state) => state.mode),
    setMode: useStore((state) => state.setMode),
  }
}

export function useData() {
  const { visibleNames } = useVisibleNames()
  const data = useStore((state) => state.data)
  const visibleData = useMemo(() => {
    return sort(data.filter((d) => visibleNames.includes(d.name)))
  }, [data, visibleNames])

  return {
    data,
    visibleData,
    setData: useStore((state) => state.setData),
    addData: useStore((state) => state.addData),
    duplicateDatum: useStore((state) => state.duplicateDatum),
  }
}
