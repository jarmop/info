import { useEffect, useState } from 'react'
import { useActiveItem, useData } from './store.ts'
import { formatYear, parseYear } from './helpers.ts'

const defaultItem = { id: -1, name: '', description: '', date: '' }

export function Sidebar() {
  const { activeItem, setActiveId } = useActiveItem()
  const { updateData, addData, removeData, duplicateItem } = useData()

  const isLargeYear = activeItem?.date.charAt(0) === '-' &&
    activeItem.date.split('-').length === 2

  const formattedDate = isLargeYear
    ? formatYear(parseFloat(activeItem.date))
    : activeItem?.date || ''

  const [item, setItem] = useState(
    activeItem ? { ...activeItem, date: formattedDate } : undefined,
  )

  useEffect(() => {
    setItem(activeItem ? { ...activeItem, date: formattedDate } : undefined)
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
        placeholder='name'
        type='text'
        className='bg-white p-1 w-full'
        value={item.name}
        onChange={(e) => setItem({ ...item, name: e.target.value })}
      />
      <input
        placeholder='date'
        type='text'
        className='bg-white mt-2 p-1'
        value={item.date}
        onChange={(e) => setItem({ ...item, date: e.target.value })}
      />
      <textarea
        placeholder='description'
        className='resize bg-white p-1 field-sizing-content block mt-2 w-full min-h-50'
        value={item.description}
        onChange={(e) => setItem({ ...item, description: e.target.value })}
      />
      <textarea
        placeholder='tags'
        className='resize bg-white p-1 field-sizing-content block mt-2 w-full'
        value={item.tags?.join(', ')}
        onChange={(e) => setItem({ ...item, tags: e.target.value.split(', ') })}
      />
      <div className='flex justify-between mt-4'>
        <div>
          <button
            type='button'
            className='bg-green-300 p-1 cursor-pointer hover:bg-green-500'
            onClick={() => {
              const newDate = item.date.split(' ').length === 1
                ? item.date
                : parseYear(item.date).toString()
              const newItem = { ...item, date: newDate }
              item.id > 0 ? updateData(newItem) : addData(newItem)
            }}
          >
            Save
          </button>
          {activeItem &&
            (
              <button
                type='button'
                className='p-1 cursor-pointer hover:bg-gray-300'
                onClick={() => {
                  duplicateItem(activeItem.id)
                }}
              >
                Copy
              </button>
            )}
          <button
            type='button'
            className='p-1 cursor-pointer hover:bg-gray-300'
            onClick={() => {
              setItem(undefined)
              setActiveId(0)
            }}
          >
            Close
          </button>
        </div>
        {item.id > 0 && (
          <button
            type='button'
            className='bg-red-300 p-1 cursor-pointer hover:bg-red-500'
            onClick={() => removeData(item.id)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  )
}
