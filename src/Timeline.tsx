import { Fragment, useEffect, useState } from 'react'
import { Datum, useData, useTags, useVisibleIds } from './store.ts'
import { Box } from './Box.tsx'
import { formatYear } from './helpers.ts'

export function Timeline() {
  const { visibleIds } = useVisibleIds()
  const { visibleData } = useData()
  const { selectedTags } = useTags()
  const [dataByYear, setDataByYear] = useState<Record<string, Datum[]>>({})
  const [years, setYears] = useState<number[]>([])
  const [yearRange, setYearRange] = useState<{ start?: number; end?: number }>({
    start: undefined,
    end: undefined,
  })

  useEffect(() => {
    const newDataByYear: typeof dataByYear = {}

    visibleData.forEach((d) => {
      const year = d.date.charAt(0) === '-'
        ? parseInt(`-${d.date.split('-')[1]}`)
        : parseInt(d.date.split('-')[0])

      if (
        (yearRange.start && year < yearRange.start) ||
        (yearRange.end && year > yearRange.end)
      ) {
        return
      }

      if (!newDataByYear[year]) {
        newDataByYear[year] = []
      }

      newDataByYear[year].push(d)
    })

    // need to sort again to get negative years first
    const newYears = Object.keys(newDataByYear).map((y) => parseInt(y)).sort(
      // Sort by numeric value, lowest first (default sort converts to string)
      (a, b) => a - b,
    )

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
    <div>
      <div className='p-1 bg-gray-300 flex'>
        <div className='p-1'>
          <input
            type='number'
            placeholder='start year'
            className='bg-white px-1 w-24'
            value={yearRange.start || ''}
            onChange={(e) =>
              setYearRange({ ...yearRange, start: parseInt(e.target.value) })}
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
            <div className='p-1'>{formatYear(year)}</div>
            {visibleIds.length > 0 && (
              <div className='flex flex-row flex-wrap'>
                {dataByYear[year].filter(
                  (d) => visibleIds.includes(d.id),
                ).map((d) => <Box key={d.id} d={d} />)}
              </div>
            )}
            {selectedTags.map((tag) => (
              <div key={tag} className='flex flex-row flex-wrap'>
                {dataByYear[year].filter((d) =>
                  d.tags?.includes(tag)
                ).map((
                  d,
                ) => <Box key={d.id} d={d} />)}
              </div>
            ))}
            <div></div>
          </Fragment>
        ))}
      </div>
    </div>
  )
}
