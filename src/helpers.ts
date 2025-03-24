import { Datum } from './store.ts'

function compare(a: Datum, b: Datum) {
  if (a.date < b.date) return -1
  else if (a.date > b.date) return 1
  else return 0
}

export function sort(data: Datum[]) {
  return data.toSorted(compare)
}
