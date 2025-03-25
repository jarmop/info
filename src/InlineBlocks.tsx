import { Datum, useActiveBox, useData, useVisibleIds } from './store.ts'

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

interface BoxProps {
  d: Datum
  showYear?: boolean
}

export function Box(
  { d, showYear = false }: BoxProps,
) {
  const { activeBox, setActiveBox } = useActiveBox()
  const { removeVisibleId } = useVisibleIds()
  const title = (showYear ? d.date + ' ' : '') + d.name

  return (
    <div
      onClick={() => activeBox === d.id ? setActiveBox(0) : setActiveBox(d.id)}
      className={`m-1 box relative text-sm ${
        activeBox === d.id ? 'active' : ''
      }`}
      onKeyUp={(e) => e.key === 'Delete' && removeVisibleId(d.id)}
      tabIndex={0}
    >
      <div className='border-1 p-1 cursor-pointer'>
        {title}
      </div>
      <div className='description invisible absolute z-10 border-1 p-2 top-full cursor-pointer w-max h-max min-w-full min-h-full'>
        <textarea
          className='resize-none field-sizing-content block cursor-pointer focus-visible:outline-0 max-w-100'
          readOnly
          defaultValue={d.description}
        />
      </div>
    </div>
  )
}

export default InlineBlocks
