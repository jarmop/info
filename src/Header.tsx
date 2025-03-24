import { useState } from 'react'
import { useData, useMode, useVisibleNames } from './store.ts'
import { Save } from './Save.tsx'

export function Header() {
  const {
    visibleNames,
    addVisibleNames: addVisibleData,
    removeVisibleNames: removeVisibleData,
  } = useVisibleNames()
  const { mode, setMode } = useMode()
  const [value, setValue] = useState('')
  const { data } = useData()

  const suggestions = data.map((d) => d.name).filter((name) =>
    !visibleNames.includes(name)
  )

  return (
    <div className='bg-gray-200 p-3 flex justify-between'>
      <div className='flex'>
        <datalist id='names'>
          {suggestions.map((name) => <option key={name} value={name} />)}
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
              addVisibleData(e.target.value)
              setValue('')
            }
          }}
          list='names'
          onKeyUp={(e) => {
            if (e.key !== 'Enter') return

            addVisibleData(value)
            setValue('')
          }}
        />
        {false && visibleNames.map((name) => (
          <div
            key={name}
            className='tag ml-2 bg-blue-300 p-1 text-sm inline-block relative cursor-pointer'
            onClick={() => removeVisibleData(name)}
          >
            {name}
            <div className='absolute top-0 left-0 bg-gray-100/60 w-full h-full content-center text-center text-lg invisible'>
              X
            </div>
          </div>
        ))}
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
