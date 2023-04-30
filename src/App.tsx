import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Map from './components/Map'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className ="map-container"style={{ width: '2000px', height: '2000px' }}>
        <Map/>
      </div>
    </>
  )
}

export default App
