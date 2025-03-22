import { useEffect, useState } from 'react'
import './App.css'
import InlineBlocks from './InlineBlocks.tsx'
import { Sidebar } from './Sidebar.tsx'
import { data } from './data.ts'
import { Header } from './Header.tsx'
import { Timeline } from './Timeline.tsx'

function App() {
  const [activeBox, setActiveBox] = useState('')
  const [visibleData, setVisibleData] = useState<string[]>([
    'Java',
    'PHP',
    'JavaScript',
  ])
  const [mode, setMode] = useState('timeline')

  useEffect(() => {
    function onKeyPress(e: KeyboardEvent) {
      if (e.key === 'Delete') {
        setVisibleData((visibleData) =>
          visibleData.filter((name) => name !== activeBox)
        )
        setActiveBox('')
      }
    }
    document.addEventListener('keypress', onKeyPress)

    return () => document.removeEventListener('keypress', onKeyPress)
  }, [activeBox])

  const filteredData = data.filter((d) => visibleData.includes(d.name))

  return (
    <>
      <Header
        visibleData={visibleData}
        setVisibleData={(name: string) =>
          !visibleData.includes(name) && setVisibleData([...visibleData, name])}
        removeVisibleData={(name: string) =>
          setVisibleData(visibleData.filter((n) => n !== name))}
        mode={mode}
        setMode={setMode}
      />
      <div className='flex flex-row'>
        {mode === 'timeline' ? <Timeline data={filteredData} /> : (
          <InlineBlocks
            data={filteredData}
            activeBox={activeBox}
            setActiveBox={setActiveBox}
          />
        )}

        {false && <Sidebar datum={data.find((d) => d.name === activeBox)} />}
      </div>
    </>
  )
}

export default App
