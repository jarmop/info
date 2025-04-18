import { useState } from 'react'
import { useData, useMode, useTags, useVisibleIds } from './store.ts'
import { Save } from './Save.tsx'
import uniq from 'lodash/uniq'

export function Header() {
  const {
    visibleIds,
    addVisibleId,
  } = useVisibleIds()
  const { mode, setMode } = useMode()
  const [value, setValue] = useState('')
  const [tag, setTag] = useState('')
  const { data, addData } = useData()
  const {
    selectedTags,
    selectTag,
    deselectTag,
    clearSelectedTags,
  } = useTags()
  const { clearVisibleIds } = useVisibleIds()

  const suggestions = data.filter((d) => !visibleIds.includes(d.id))
  const tags = uniq(suggestions.flatMap((d) => d.tags || [])).filter((tag) =>
    tag !== undefined &&
    !selectedTags.includes(tag)
  ).toSorted((a, b) => a.localeCompare(b))

  return (
    <div className='bg-gray-200 p-1'>
      <div className='flex justify-between'>
        <div className='flex'>
          <datalist id='names'>
            {suggestions.map((d) => (
              <option key={d.id} value={d.id} label={d.name} />
            ))}
          </datalist>
          <input
            type='text'
            placeholder='Search items'
            className='bg-white p-1'
            value={value}
            onChange={(e) => {
              if ('data' in e.nativeEvent) {
                setValue(e.target.value)
              } else {
                // Changed by selecting a suggestion
                addVisibleId(parseInt(e.target.value))
                setValue('')
              }
            }}
            list='names'
            onKeyUp={(e) => {
              if (e.key !== 'Enter') return

              const item = data.find((d) => d.name === value)
              if (!item) {
                addData({ id: -1, name: value, date: '', description: '' })
              } else {
                addVisibleId(item.id)
              }
              setValue('')
            }}
          />
          <datalist id='tags'>
            {tags.map((tag) => <option key={tag} value={tag} />)}
          </datalist>
          <input
            type='text'
            placeholder='Search tags'
            className='bg-white p-1 ml-2'
            value={tag}
            onChange={(e) => {
              if ('data' in e.nativeEvent) {
                setTag(e.target.value)
              } else {
                // Changed by selecting a suggestion
                selectTag(e.target.value)
                setTag('')
              }
            }}
            list='tags'
            onKeyUp={(e) => {
              if (e.key !== 'Enter') return

              const item = data.find((d) => d.name === value)

              if (!item) return

              addVisibleId(item.id)
              setValue('')
            }}
          />
          <Link mode={mode} setMode={setMode} name='timeline' />
          <Link mode={mode} setMode={setMode} name='flow' />
        </div>
        <Save />
      </div>
      <div className='mt-1'>
        {visibleIds.length > 0 &&
          (
            <button
              type='button'
              onClick={clearVisibleIds}
              className='bg-gray-200 hover:bg-gray-400 px-1 cursor-pointer'
            >
              Clear items
            </button>
          )}
        {selectedTags.map((tag) => (
          <button
            key={tag}
            type='button'
            className='px-1 bg-gray-100 hover:bg-gray-300 cursor-pointer mr-2 border-1 border-gray-500'
            onClick={() => deselectTag(tag)}
          >
            {tag}
          </button>
        ))}
        {selectedTags.length > 1 &&
          (
            <button
              key={tag}
              type='button'
              className='px-1 hover:bg-gray-300 cursor-pointer'
              onClick={clearSelectedTags}
            >
              Clear tags
            </button>
          )}
      </div>
    </div>
  )
}

function Link(
  { mode, setMode, name }: {
    mode: string
    setMode: (mode: string) => void
    name: string
  },
) {
  return (
    <div
      className={`ml-2 content-center cursor-pointer capitalize ${
        mode === name ? 'bg-blue-200' : ''
      }`}
      onClick={() => setMode(name)}
    >
      {name}
    </div>
  )
}
