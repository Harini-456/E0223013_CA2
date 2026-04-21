import { useState } from 'react'

import './App.css'

function App() {
  const [order] = useState(0)

  return (
    <>
      
        <div>
          <h1>Order</h1>
</div>
      <button>Get Order</button>
    </>
  )
}

export default App
