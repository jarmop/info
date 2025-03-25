import { useEffect } from 'react'
import './App.css'
import InlineBlocks from './InlineBlocks.tsx'
import { Header } from './Header.tsx'
import { Timeline } from './Timeline.tsx'
import { useActiveBox, useData, useMode, useVisibleIds } from './store.ts'
import { Sidebar } from './Sidebar.tsx'

function App() {
  const { activeBox, setActiveBox } = useActiveBox()
  const { removeVisibleId: removeVisibleData } = useVisibleIds()
  const { mode } = useMode()
  const { duplicateDatum } = useData()

  useEffect(() => {
    function onKeyPress(e: KeyboardEvent) {
      if (e.key === 'Delete') {
        removeVisibleData(activeBox)
        setActiveBox(0)
      } else if (e.ctrlKey && e.key === 'c') {
        duplicateDatum(activeBox)
      } else if (e.key === 'Escape') {
        setActiveBox(0)
      }
    }
    document.addEventListener('keyup', onKeyPress)

    return () => document.removeEventListener('keyup', onKeyPress)
  }, [activeBox])

  return (
    <>
      <Header />
      <div className='relative'>
        {mode === 'timeline' ? <Timeline /> : <InlineBlocks />}
        <Sidebar />
      </div>
    </>
  )
}

export default App
