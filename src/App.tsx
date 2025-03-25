import { useEffect } from 'react'
import './App.css'
import InlineBlocks from './InlineBlocks.tsx'
import { Header } from './Header.tsx'
import { Timeline } from './Timeline.tsx'
import { useActiveBox, useData, useMode } from './store.ts'
import { Sidebar } from './Sidebar.tsx'

function App() {
  const { activeBox, setActiveBox } = useActiveBox()
  const { mode } = useMode()
  const { duplicateDatum } = useData()

  useEffect(() => {
    function onKeyUp(e: KeyboardEvent) {
      if (e.ctrlKey && e.key === 'c') {
        duplicateDatum(activeBox)
      } else if (e.key === 'Escape') {
        setActiveBox(0)
      }
    }
    document.addEventListener('keyup', onKeyUp)

    return () => document.removeEventListener('keyup', onKeyUp)
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
