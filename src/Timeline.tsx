import { Fragment, useEffect, useState } from 'react'
import { Datum, useData, useTags, useVisibleIds } from './store.ts'
import { Box } from './Box.tsx'

export function Timeline() {
  const { visibleIds } = useVisibleIds()
  const { visibleData } = useData()
  const { selectedTags } = useTags()
  const [dataByYear, setDataByYear] = useState<Record<string, Datum[]>>({})
  const [years, setYears] = useState<number[]>([])
  const [showAllYears, setShowAllYears] = useState(false)

  useEffect(() => {
    const newDataByYear: typeof dataByYear = {}

    visibleData.forEach((d) => {
      const year = parseInt(d.date.split('-')[0])
      if (!newDataByYear[year]) {
        newDataByYear[year] = []
      }
      newDataByYear[year].push(d)
    })

    const dataYears = Object.keys(newDataByYear).map((y) => parseInt(y))
    const minYear = Math.min(...dataYears)
    const maxYear = Math.max(...dataYears)
    const newYears: number[] = []
    for (let i = minYear; i <= maxYear; i++) {
      newYears.push(i)
    }

    setDataByYear(newDataByYear)
    setYears(newYears)
    const amountOfColumns = (visibleIds.length > 0 ? 2 : 1) +
      selectedTags.length

    document.documentElement.style.setProperty(
      '--timeline-grid-cols',
      `repeat(${amountOfColumns}, auto) 1fr`,
    )
  }, [visibleData])

  const visibleYears = showAllYears
    ? years
    : Object.keys(dataByYear).map((y) => parseInt(y))

  return (
    <div>
      <div className='p-1 bg-gray-300 flex'>
        <div className='cursor-pointer ml-2'>
          <input
            type='checkbox'
            id='year'
            checked={showAllYears}
            onChange={() => setShowAllYears(!showAllYears)}
            className='cursor-pointer'
          />
          <label htmlFor='year' className='ml-1 cursor-pointer'>
            Show all years
          </label>
        </div>
      </div>
      <div className='grid grid-cols-(--timeline-grid-cols)'>
        <div></div>
        {visibleIds.length > 0 && <div></div>}
        {selectedTags.map((tag) => <div key={tag}>{tag}</div>)}
        <div></div>
        {visibleYears.map((year) => (
          <Fragment key={year}>
            <div className='p-1'>{year}</div>
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
