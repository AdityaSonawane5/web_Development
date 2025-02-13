import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  let handelbutton=()=>{
    setCount(count+1)
  }

  return (
    <div>
      <div className=''>{count}</div>
      <button className='bg-blue-300 h-10 w-20 rounded-md'  onClick={handelbutton} >click</button>
        
    </div>
  )
}

export default App
