import { sortById } from './helpers.ts'
import { Datum, useData } from './store.ts'
import { get, set } from 'idb-keyval'
import rawData from './assets/data.json' with { type: 'json' }
import isEqual from 'lodash/isEqual'
import { useEffect, useMemo } from 'react'

async function saveData(data: Datum[]) {
  let fileHandle = await get('fileHandle')
  if (!fileHandle) {
    ;[fileHandle] = await globalThis.showOpenFilePicker()
    set('fileHandle', fileHandle)
  }

  const writable = await fileHandle.createWritable()

  const rawData = JSON.stringify(sortById(data))

  await writable.write(rawData)
  await writable.close()
}

export function Save() {
  const { data, resetData: resetData } = useData()

  const dataChanged = useMemo(
    () => !isEqual(sortById(data), sortById(rawData)),
    [data],
  )

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault()
        saveData(data)
      }
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [dataChanged])

  return (
    <div className='flex'>
      {dataChanged &&
        (
          <>
            <button
              type='button'
              onClick={resetData}
              className='cursor-pointer px-1 mr-1 hover:bg-gray-300'
            >
              Reset
            </button>
            <button
              type='button'
              onClick={() => saveData(data)}
              className='cursor-pointer px-1 bg-blue-300 hover:bg-blue-500'
            >
              Save
            </button>
          </>
        )}
    </div>
  )
}
