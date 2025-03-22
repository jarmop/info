import { Fragment, useEffect, useState } from 'react'
import { Datum, useData } from './data.ts'
import { Box } from './InlineBlocks.tsx'

// const years: number[] = [];
// for (let i = 1900; i < 2026; i++) {
//   years.push(i);
// }

export function Timeline() {
  const data = useData()
  const [dataByYear, setDataByYear] = useState<Record<string, Datum[]>>({})
  const [years, setYears] = useState<number[]>([])
  const [showAllYears, setShowAllYears] = useState(false)

  useEffect(() => {
    const newDataByYear: typeof dataByYear = {}

    data.forEach((d) => {
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
    // setYears(dataYears)
  }, [data])

  const visibleYears = showAllYears
    ? years
    : Object.keys(dataByYear).map((y) => parseInt(y))

  return (
    <div>
      <div className='p-1 bg-gray-300'>
        <input
          type='checkbox'
          name='year'
          checked={showAllYears}
          onChange={() => setShowAllYears(!showAllYears)}
          className='m-1'
        />
        <label htmlFor='year' className='m-1'>Show all years</label>
      </div>
      <div className='grid grid-cols-[auto_1fr]'>
        {visibleYears.map((year) => (
          <Fragment key={year}>
            <div className='p-1'>{year}</div>
            <div className='flex flex-row flex-wrap'>
              {dataByYear[year]?.map((d) => <Box key={d.name} d={d} />)}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  )
}
