import { sortById } from './helpers.ts'
import { Datum, useData } from './store.ts'
import { get, set } from 'idb-keyval'

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
  const { data } = useData()

  return <button type='button' onClick={() => saveData(data)}>Save</button>
}
