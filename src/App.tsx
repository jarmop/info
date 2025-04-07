import './App.css'
import { Flow } from './Flow.tsx'
import { Header } from './Header.tsx'
import { Timeline } from './Timeline.tsx'
import { useMode } from './store.ts'
import { Sidebar } from './Sidebar.tsx'

function App() {
  const { mode } = useMode()

  return (
    <>
      <Header />
      {mode === 'timeline' ? <Timeline /> : <Flow />}
      <Sidebar />
    </>
  )
}

export default App
