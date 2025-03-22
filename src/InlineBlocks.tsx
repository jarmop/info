import { Datum, useData } from './data.ts'
import { useActiveBox } from './store.ts'

function InlineBlocks() {
  const data = useData()

  return (
    <div className='m-2'>
      <div className='-m-1 flex flex-row flex-wrap'>
        {data.map((d) => (
          <Box
            key={d.name}
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

  const title = (showYear ? d.date + ' ' : '') + d.name

  return (
    <div
      onClick={() =>
        activeBox === d.name ? setActiveBox('') : setActiveBox(d.name)}
      className={`m-1 box relative text-sm ${
        activeBox === d.name ? 'active' : ''
      }`}
    >
      <div className='border-2 p-1 cursor-pointer'>
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
