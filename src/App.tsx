import { useEffect } from 'react'
import './App.css'
import InlineBlocks from './InlineBlocks.tsx'
import { Header } from './Header.tsx'
import { Timeline } from './Timeline.tsx'
import { useActiveBox, useMode, useVisibleData } from './store.ts'

function App() {
  const { activeBox, setActiveBox } = useActiveBox()
  const { removeVisibleData } = useVisibleData()
  const { mode } = useMode()

  useEffect(() => {
    function onKeyPress(e: KeyboardEvent) {
      if (e.key === 'Delete') {
        removeVisibleData(activeBox)
        setActiveBox('')
      }
    }
    document.addEventListener('keypress', onKeyPress)

    return () => document.removeEventListener('keypress', onKeyPress)
  }, [activeBox])

  return (
    <>
      <Header />
      {mode === 'timeline' ? <Timeline /> : <InlineBlocks />}
    </>
  )
}

export default App
