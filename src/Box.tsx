import { formatYear, getYear } from './helpers.ts'
import { Datum, useActiveItem, useData, useVisibleIds } from './store.ts'

interface BoxProps {
  d: Datum
  showYear?: boolean
  showImage?: boolean
}

export function Box(
  { d, showYear = false, showImage = false }: BoxProps,
) {
  const { activeId, setActiveId } = useActiveItem()
  const { removeVisibleId } = useVisibleIds()
  const { duplicateItem } = useData()
  const title = (showYear ? formatDate(d.date) + ' ' : '') + d.name
  const largeImage = false
  // const largeImage = true

  return (
    <div
      onClick={() => activeId === d.id ? setActiveId(0) : setActiveId(d.id)}
      className={`border-1 m-[2px] p-1 box relative text-xs ${
        largeImage ? 'max-w-80' : 'max-w-40'
      } ${activeId === d.id ? 'bg-blue-200' : ''}`}
      onKeyDown={(e) => {
        if (e.key === 'Delete') {
          removeVisibleId(d.id)
        } else if (e.ctrlKey && e.key === 'c') {
          duplicateItem(activeId)
        } else if (e.key === 'Escape') {
          setActiveId(0)
        }
      }}
      tabIndex={0}
    >
      <div className='cursor-pointer'>
        {title}
      </div>
      {showImage && d.image && (
        <a
          href={d.image.large || d.image.small}
          className='flex justify-center'
          target='_blank'
        >
          <img
            src={d.image.small || undefined}
            className={`${largeImage ? 'max-h-50' : 'max-h-30'}`}
          />
        </a>
      )}
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

function formatDate(date: string) {
  const year = getYear(date)
  if (year < 0) {
    return formatYear(year)
  }

  return date
}
