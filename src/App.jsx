import { useState } from 'react'

function App() {

  const [count, setCount] = useState(0)

  return (
    <>
      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <h1> restart </h1>
      </div>
    </>
  )
}

export default App