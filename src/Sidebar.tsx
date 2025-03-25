import { useEffect, useState } from 'react'
import { useActiveBox, useData } from './store.ts'

const defaultItem = { id: -1, name: '', description: '', date: '' }

export function Sidebar() {
  const { activeItem } = useActiveBox()
  const { updateData } = useData()
  const [item, setItem] = useState(activeItem)

  useEffect(() => {
    setItem(activeItem)
  }, [activeItem])

  if (!item) {
    return (
      <button
        type='button'
        className='absolute right-0 top-0 bg-blue-400 text-xl px-2 cursor-pointer'
        onClick={() => setItem(defaultItem)}
      >
        +
      </button>
    )
  }

  return (
    <div
      key={item.id}
      className='w-120 bg-gray-200 p-2 pt-0 absolute right-0 top-0'
    >
      <input
        type='text'
        className='bg-white p-2 w-full'
        value={item.name}
        onChange={(e) => setItem({ ...item, name: e.target.value })}
      />
      <textarea
        className='resize bg-white p-2 field-sizing-content block mt-2 w-full min-h-50'
        value={item.description}
        onChange={(e) => setItem({ ...item, description: e.target.value })}
      />
      <div className='flex justify-between mt-4'>
        <button
          type='button'
          className='bg-green-300 p-1 cursor-pointer hover:bg-green-500'
          onClick={() => updateData(item)}
        >
          Save
        </button>
        <button
          type='button'
          className='bg-green-300 p-1 cursor-pointer hover:bg-green-500'
        >
          Create new
        </button>
      </div>
    </div>
  )
}
