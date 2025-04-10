import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import rawData from './assets/data.json' with { type: 'json' }
import { useMemo } from 'react'
import { sortByDate } from './helpers.ts'

export type Datum = {
  id: number
  name: string
  description: string
  date: string
  end?: string
  tags?: string[]
  image?: { small: string; large: string }
  person?: string
}

interface State {
  activeId: number
  setActiveId: (id: number) => void
  visibleIds: number[]
  setVisibleIds: (ids: number[]) => void
  addVisibleId: (id: number) => void
  removeVisibleId: (id: number) => void
  mode: string
  setMode: (mode: string) => void
  data: Datum[]
  resetData: () => void
  addData: (datum: Datum) => void
  updateData: (datum: Datum) => void
  removeData: (id: number) => void
  duplicateDatum: (id: number) => void
  selectedTags: string[]
  setSelectedTags: (tags: string[]) => void
}

function getNextId(data: Datum[]) {
  return Math.max(...data.map((d) => d.id)) + 1
}

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      activeId: 0,
      setActiveId: (id: number) => set({ activeId: id }),
      visibleIds: [1, 2, 3, 4, 5, 6],
      setVisibleIds: (id) => set({ visibleIds: id }),
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
      resetData: () => set({ data: rawData }),
      addData: (datum) => {
        const data = get().data
        const newItem = { ...datum, id: getNextId(data) }
        set({
          data: [...get().data, newItem],
          visibleIds: [...get().visibleIds, newItem.id],
          activeId: newItem.id,
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
      removeData: (id) =>
        set({
          data: get().data.filter((d) => d.id !== id),
          activeId: 0,
          visibleIds: get().visibleIds.filter((i) => i !== id),
        }),
      duplicateDatum: (id) => {
        const data = get().data
        const itemToDuplicate = data.find((d) => d.id === id)
        if (!itemToDuplicate) {
          return
        }

        const newItem = { ...itemToDuplicate, id: getNextId(data) }

        const isVisibleByTag = newItem.tags &&
          newItem.tags.some((t) => get().selectedTags.includes(t))

        set({
          data: [...data, newItem],
          visibleIds: isVisibleByTag
            ? get().visibleIds
            : [...get().visibleIds, newItem.id],
          activeId: newItem.id,
        })
      },
      selectedTags: [],
      setSelectedTags: (tags) => set({ selectedTags: tags }),
    }),
    {
      name: 'foo',
    },
  ),
)

export function useActiveItem() {
  const activeId = useStore((state) => state.activeId)
  const data = useStore((state) => state.data)
  const activeItem = useMemo(() => {
    return data.find((d) => d.id === activeId)
  }, [data, activeId])

  return {
    activeId: useStore((state) => state.activeId),
    setActiveId: useStore((state) => state.setActiveId),
    activeItem,
  }
}

export function useVisibleIds() {
  const setVisibleIds = useStore((state) => state.setVisibleIds)

  return {
    visibleIds: useStore((state) => state.visibleIds),
    clearVisibleIds: () => setVisibleIds([]),
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
  const { selectedTags } = useTags()
  const data = useStore((state) => state.data)
  const visibleData = useMemo(() => {
    return sortByDate(
      data.filter((d) =>
        visibleIds.includes(d.id) ||
        selectedTags.some((selectedTag) => d.tags?.includes(selectedTag))
      ),
    )
  }, [data, visibleIds, selectedTags])

  return {
    data,
    visibleData,
    resetData: useStore((state) => state.resetData),
    addData: useStore((state) => state.addData),
    updateData: useStore((state) => state.updateData),
    removeData: useStore((state) => state.removeData),
    duplicateItem: useStore((state) => state.duplicateDatum),
  }
}

export function useTags() {
  const setSelectedTags = useStore((state) => state.setSelectedTags)
  const selectedTags = useStore((state) => state.selectedTags)

  return {
    selectedTags,
    selectTag: (tag: string) => setSelectedTags([...selectedTags, tag]),
    deselectTag: (tag: string) =>
      setSelectedTags(selectedTags.filter((t) => t !== tag)),
    clearSelectedTags: () => setSelectedTags([]),
  }
}
