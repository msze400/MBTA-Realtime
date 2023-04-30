import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Map from './components/Map'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className ="map-container"style={{ width: '1000px', height: '1000px' }}>
        <Map/>
      </div>
    </>
  )
}

export default App
