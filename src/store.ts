import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import rawData from './assets/data.json' with { type: 'json' }
import { useMemo } from 'react'
import { sortByDate } from './helpers.ts'

export type Datum = typeof rawData[number]

// export type Datum = {
//   id: number
//   name: string
//   description: string
//   date: string
// }

interface State {
  activeBox: number
  setActiveBox: (activeBox: number) => void
  visibleIds: number[]
  addVisibleId: (id: number) => void
  removeVisibleId: (id: number) => void
  mode: string
  setMode: (mode: string) => void
  data: Datum[]
  setData: (data: Datum[]) => void
  addData: (datum: Datum) => void
  updateData: (datum: Datum) => void
  duplicateDatum: (id: number) => void
}

function getNextId(data: Datum[]) {
  return Math.max(...data.map((d) => d.id)) + 1
}

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      activeBox: 0,
      setActiveBox: (activeBox: number) => set({ activeBox }),
      visibleIds: [1, 2, 3, 4, 5, 6],
      addVisibleId: (name) =>
        set(
          !get().visibleIds.includes(name)
            ? {
              visibleIds: [...get().visibleIds, name],
            }
            : get(),
        ),
      removeVisibleId: (name) =>
        set({
          visibleIds: get().visibleIds.filter((n) => n !== name),
        }),
      mode: 'timeline',
      setMode: (mode) => set({ mode }),
      data: rawData,
      setData: (data) => set({ data }),
      addData: (datum) => {
        const data = get().data
        const newItem = { ...datum, id: getNextId(data) }
        set({
          data: [...get().data, newItem],
          visibleIds: [...get().visibleIds, newItem.id],
        })
      },
      updateData: (datum) => {
        const data = get().data
        const index = data.findIndex((d) => d.id === datum.id)
        const start = data.slice(0, index)
        const end = data.slice(index + 1)
        const newData = [...start, datum, ...end]

        set({ data: newData })
      },
      duplicateDatum: (id) => {
        const data = get().data
        const itemToDuplicate = data.find((d) => d.id === id)
        if (!itemToDuplicate) {
          return
        }

        const newItem = { ...itemToDuplicate, id: getNextId(data) }

        set({
          data: [...data, newItem],
          visibleIds: [...get().visibleIds, newItem.id],
        })
      },
    }),
    {
      name: 'foo',
    },
  ),
)

export function useActiveBox() {
  const activeBox = useStore((state) => state.activeBox)
  const data = useStore((state) => state.data)
  const activeItem = useMemo(() => {
    return data.find((d) => d.id === activeBox)
  }, [data, activeBox])

  return {
    activeBox: useStore((state) => state.activeBox),
    setActiveBox: useStore((state) => state.setActiveBox),
    activeItem,
  }
}

export function useVisibleIds() {
  return {
    visibleIds: useStore((state) => state.visibleIds),
    addVisibleId: useStore((state) => state.addVisibleId),
    removeVisibleId: useStore((state) => state.removeVisibleId),
  }
}

export function useMode() {
  return {
    mode: useStore((state) => state.mode),
    setMode: useStore((state) => state.setMode),
  }
}

export function useData() {
  const { visibleIds } = useVisibleIds()
  const data = useStore((state) => state.data)
  const visibleData = useMemo(() => {
    return sortByDate(data.filter((d) => visibleIds.includes(d.id)))
  }, [data, visibleIds])

  return {
    data,
    visibleData,
    setData: useStore((state) => state.setData),
    addData: useStore((state) => state.addData),
    updateData: useStore((state) => state.updateData),
    duplicateDatum: useStore((state) => state.duplicateDatum),
  }
}
