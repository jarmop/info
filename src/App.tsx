import { useEffect } from 'react'
import './App.css'
import InlineBlocks from './InlineBlocks.tsx'
import { Header } from './Header.tsx'
import { Timeline } from './Timeline.tsx'
import { useActiveBox, useData, useMode, useVisibleNames } from './store.ts'

function App() {
  const { activeBox, setActiveBox } = useActiveBox()
  const { removeVisibleNames: removeVisibleData } = useVisibleNames()
  const { mode } = useMode()
  const { duplicateDatum } = useData()

  useEffect(() => {
    function onKeyPress(e: KeyboardEvent) {
      if (e.key === 'Delete') {
        removeVisibleData(activeBox)
        setActiveBox('')
      }
      if (e.ctrlKey && e.key === 'c') {
        console.log(e)
        duplicateDatum(activeBox)
      }
    }
    document.addEventListener('keyup', onKeyPress)

    return () => document.removeEventListener('keyup', onKeyPress)
  }, [activeBox])

  return (
    <>
      <Header />
      {mode === 'timeline' ? <Timeline /> : <InlineBlocks />}
    </>
  )
}

export default App
