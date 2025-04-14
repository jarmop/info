import { Fragment, useEffect, useState } from 'react'
import { Datum, useData, useTags, useVisibleIds } from './store.ts'
import { Box } from './Box.tsx'
import { formatYear, getYear } from './helpers.ts'

const startYear = 1850
const yearSpan = 200

export function Timeline() {
  const { visibleIds } = useVisibleIds()
  const { visibleData } = useData()
  const { selectedTags } = useTags()
  const [dataByYear, setDataByYear] = useState<Record<string, Datum[]>>({})
  const [years, setYears] = useState<number[]>([])
  const [yearRange, setYearRange] = useState<{ start?: number; end?: number }>({
    start: startYear,
    // end: new Date().getFullYear(),
    end: startYear + yearSpan,
  })
  const step = 5

  useEffect(() => {
    const newDataByYear: typeof dataByYear = {}

    function yearToMillennia(year: number) {
      return Math.floor(year / step) * step
    }

    visibleData.forEach((d) => {
      const year = getYear(d.date)
      const millennia = yearToMillennia(year)

      if (
        (yearRange.start !== undefined && year < yearRange.start) ||
        (yearRange.end !== undefined && year > yearRange.end)
      ) {
        return
      }

      if (!newDataByYear[millennia]) {
        newDataByYear[millennia] = []
      }

      newDataByYear[millennia].push(d)
    })

    // need to sort again to get negative years first
    const keyYears = Object.keys(newDataByYear).map((y) => parseInt(y)).sort(
      // Sort by numeric value, lowest first (default sort converts to string)
      (a, b) => a - b,
    )
    const minYear = Math.min(...keyYears)
    const maxYear = Math.max(...keyYears)
    const newYears: number[] = []
    const loopLimit = 1000
    const maxYearLimit = (maxYear - minYear) / step > loopLimit
      ? minYear + loopLimit * step
      : maxYear
    for (let i = minYear; i <= maxYearLimit; i += step) {
      newYears.push(i)
      if (!newDataByYear[i]) {
        newDataByYear[i] = []
      }
    }

    setDataByYear(newDataByYear)
    setYears(newYears)
    const amountOfColumns = (visibleIds.length > 0 ? 2 : 1) +
      selectedTags.length

    document.documentElement.style.setProperty(
      '--timeline-grid-cols',
      `repeat(${amountOfColumns}, auto) 1fr`,
    )
  }, [visibleData, yearRange])

  return (
    <div className='text-xs'>
      <div className='p-1 bg-gray-300 flex'>
        <div className='p-1'>
          <input
            type='text'
            placeholder='start year'
            className='bg-white px-1 w-24'
            defaultValue={yearRange.start || ''}
            onChange={(e) => {
              const value = parseInt(e.target.value)
              if (isNaN(value)) {
                return
              }
              setYearRange({ start: value, end: value + yearSpan })
            }}
          />
        </div>
      </div>
      <div className='grid grid-cols-(--timeline-grid-cols)'>
        <div></div>
        {visibleIds.length > 0 && <div></div>}
        {selectedTags.map((tag) => <div key={tag}>{tag}</div>)}
        <div></div>
        {years.map((year) => (
          <Fragment key={year}>
            <div className='p-1 text-xl mt-4 border-t-2'>
              {formatYear(year)}
            </div>
            {visibleIds.length > 0 && (
              <div className='flex flex-row flex-wrap'>
                {dataByYear[year].filter(
                  (d) => visibleIds.includes(d.id),
                ).map((d) => <Box key={d.id} d={d} />)}
              </div>
            )}
            {selectedTags.map((tag) => (
              <div
                key={tag}
                className='flex flex-row flex-wrap mt-4 border-t-2'
              >
                {dataByYear[year].filter((d) => d.tags?.includes(tag)).map((
                  d,
                ) => <Box key={d.id} d={d} showYear showImage />)}
              </div>
            ))}
            <div></div>
          </Fragment>
        ))}
      </div>
    </div>
  )
}
