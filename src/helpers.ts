import { Datum } from './store.ts'

function compareDate(a: Datum, b: Datum) {
  if (a.date < b.date) return -1
  else if (a.date > b.date) return 1
  else return 0
}

export function sortByDate(data: Datum[]) {
  return data.toSorted(compareDate)
}

function compareId(a: Datum, b: Datum) {
  if (a.id < b.id) return -1
  else if (a.id > b.id) return 1
  else return 0
}

export function sortById(data: Datum[]) {
  return data.toSorted(compareId)
}
