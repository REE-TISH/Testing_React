import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'

function App() {

  const [data,setData] = useState(null)
  const [isLoading,setIsLoading] = useState(true)

  useEffect(()=>{

    axios.get('	https://api.github.com/users/REE-TISH')
    .then((data)=>{
      console.log(data.data)
      setData(data.data)
      setIsLoading(false)
    })
    

  },[isLoading])

  if(isLoading){
    return (<>
     <div className='min-h-screen bg-slate-800 flex justify-center items-center text-white' >

      <h1 className='text-3xl '>Loading...</h1>

     </div>
    </>)
  }

  return (
    <>
     <div className='min-h-screen bg-slate-800 flex flex-col gap-5 justify-center items-center text-white text-center' >

      <img src={data.avatar_url} className='rounded-xl h-80' />
      <h1 className='text-xl'>{data.login}</h1>

     </div>
    </>
  )
}

export default App
