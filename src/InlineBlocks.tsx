import { Box } from './Box.tsx'
import { useData } from './store.ts'

function InlineBlocks() {
  const { visibleData } = useData()

  return (
    <div className='m-2'>
      <div className='-m-1 flex flex-row flex-wrap'>
        {visibleData.map((d) => (
          <Box
            key={d.id}
            d={d}
            showYear
          />
        ))}
      </div>
    </div>
  )
}

export default InlineBlocks
