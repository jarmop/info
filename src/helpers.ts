import { Datum } from './store.ts'

export function getYear(date: string) {
  const parts = date.split('-')
  return parts[0] === '' ? -parseInt(parts[1]) : parseInt(parts[0])
}

function compareDate(a: Datum, b: Datum) {
  const aYear = getYear(a.date)
  const bYear = getYear(b.date)

  if (aYear < bYear) return -1
  else if (aYear > bYear) return 1
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
  } else if (year <= -2e4) {
    return `${year / 1e3} K`
  } else if (year < 0) {
    return `${Math.abs(year)} BC`
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
  } else if (lastChar === 'C') {
    parsedYear = -num
  }

  // Float multiplication leads to precision errors
  return Math.round(parsedYear)
}
