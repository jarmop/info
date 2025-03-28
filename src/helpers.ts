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

export function formatYear(year: number) {
  if (year <= -1e9) {
    return `${year / 1e9} B`
  } else if (year <= -1e6) {
    return `${year / 1e6} M`
  } else if (year <= -1e4) {
    return `${year / 1e3} K`
  }

  return year.toString()
}

export function parseYear(year: string) {
  const lastChar = year.slice(-1)
  const num = parseFloat(year.split(' ')[0])

  let parsedYear = num
  if (lastChar === 'B') {
    parsedYear = num * 1e9
  } else if (lastChar === 'M') {
    parsedYear = num * 1e6
  } else if (lastChar === 'K') {
    parsedYear = num * 1e3
  }

  // Float multiplication leads to precision errors
  return Math.round(parsedYear)
}
