import { useState } from 'react'
import { useData, useMode, useVisibleIds } from './store.ts'
import { Save } from './Save.tsx'

export function Header() {
  const {
    visibleIds,
    addVisibleId,
  } = useVisibleIds()
  const { mode, setMode } = useMode()
  const [value, setValue] = useState('')
  const { data } = useData()

  const suggestions = data.filter((d) => !visibleIds.includes(d.id))

  return (
    <div className='bg-gray-200 p-1 flex justify-between'>
      <div className='flex'>
        <datalist id='names'>
          {suggestions.map((d) => (
            <option key={d.id} value={d.id} label={d.name} />
          ))}
        </datalist>
        <input
          type='text'
          placeholder='Search'
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
