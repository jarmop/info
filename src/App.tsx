import './App.css'
import InlineBlocks from './InlineBlocks.tsx'
import { Header } from './Header.tsx'
import { Timeline } from './Timeline.tsx'
import { useMode } from './store.ts'
import { Sidebar } from './Sidebar.tsx'

function App() {
  const { mode } = useMode()

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
