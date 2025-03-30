import { Datum, useActiveItem, useData, useVisibleIds } from './store.ts'

interface BoxProps {
  d: Datum
  showYear?: boolean
}

export function Box(
  { d, showYear = false }: BoxProps,
) {
  const { activeId, setActiveId } = useActiveItem()
  const { removeVisibleId } = useVisibleIds()
  const { duplicateDatum } = useData()
  const title = (showYear ? d.date + ' ' : '') + d.name

  return (
    <div
      onClick={() => activeId === d.id ? setActiveId(0) : setActiveId(d.id)}
      className={`border-1  m-1 box relative text-sm ${
        activeId === d.id ? 'bg-blue-200' : ''
      }`}
      onKeyDown={(e) => {
        if (e.key === 'Delete') {
          removeVisibleId(d.id)
        } else if (e.ctrlKey && e.key === 'c') {
          duplicateDatum(activeId)
        } else if (e.key === 'Escape') {
          setActiveId(0)
        }
      }}
      tabIndex={0}
    >
      <div className='p-1 cursor-pointer'>
        {title}
      </div>
      {
        /* <div className='description invisible absolute z-10 border-1 p-2 top-full cursor-pointer w-max h-max min-w-full min-h-full'>
        <textarea
          className='resize-none field-sizing-content block cursor-pointer focus-visible:outline-0 max-w-100'
          readOnly
          defaultValue={d.description}
        />
      </div> */
      }
    </div>
  )
}
