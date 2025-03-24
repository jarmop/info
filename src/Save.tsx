import { sort } from './helpers.ts'
import { Datum, useData } from './store.ts'

async function saveData(data: Datum[]) {
  const [fileHandle] = await globalThis.showOpenFilePicker()
  const writable = await fileHandle.createWritable()

  const rawData = JSON.stringify(sort(data))

  await writable.write(rawData)
  await writable.close()

  console.log(fileHandle)
}

export function Save() {
  const { data } = useData()

  return <button type='button' onClick={() => saveData(data)}>Save</button>
}
