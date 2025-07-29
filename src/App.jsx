import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import {ScaleLoader} from 'react-spinners'

function App() {

  const [data,setData] = useState(null)
  const [isLoading,setIsLoading] = useState(true)
  const RefSocket = useRef(null)
  const [word,setWord] = useState('')

  // useEffect(()=>{

  //   axios.get('	https://api.github.com/users/REE-TISH')
  //   .then((data)=>{
  //     console.log(data.data)
  //     setData(data.data)
  //     setIsLoading(false)
  //   })
    
    

  // },[isLoading])

  useEffect(()=>{
    RefSocket.current = new WebSocket("ws://localhost:8000/ws/chat/group1/");


    RefSocket.current.onmessage = function(e){
      const data =  JSON.parse(e.data)
      console.log(data)
    }

  },[])

  useEffect(()=>{

    axios.get('https://backend-6d0x.onrender.com/')
    .then((data)=>{
      console.log(data.data)
      setData(data.data)
      setIsLoading(false)
    })
    
    

  },[isLoading])

  const Check_key = (e)=>{
    console.log(e)
    const data = {
      message:word
    }
    if(e.key == 'Enter' && e.target.value != ''){
      RefSocket.current.send(
        JSON.stringify(data)
      )
      setWord('')
    }
  }


  if(isLoading){
    return (<>
     <div className='min-h-screen bg-slate-800 flex justify-center items-center text-white ' >

      
      <div className=''>
        {/* <input type="text" className='bg-transparent p-1 border border-slate-600 rounded-md focus:outline-none' onChange={(e)=>{
          setWord(e.target.value)
        }}  onKeyDown={(e)=>{
          Check_key(e)
        }}/> */}

        <h1 className='text-2xl'>Loading...</h1>
      </div>
     </div>
    </>)
  }

  return (
    <>
     <div className='min-h-screen bg-slate-800 flex flex-col gap-5 justify-center items-center text-white text-center' >

      <img src={data.avatar} className='rounded-xl h-80' />
      
    <h1>{data.User}</h1>
    <p>{data.body}</p>
     </div>
    </>
  )
}

export default App
