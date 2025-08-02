import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'


function App() {

  const [data,setData] = useState(null)
  const [isLoading,setIsLoading] = useState(true)
  const RefSocket = useRef(null)
  const [word,setWord] = useState('')
 
  const [message,setMessage] = useState(null)


  useEffect(()=>{
    RefSocket.current = new WebSocket("wss://websocketbackend-tel9.onrender.com/ws/chat/chat_1/");


    RefSocket.current.onmessage = function(e){
      const data =  JSON.parse(e.data)
      console.log(data)
      setMessage((prev)=>[...prev,data])
    }

  },[])

  useEffect(()=>{

    axios.get('https://backend-ch1a.onrender.com/')
    .then((data)=>{
      console.log(data.data)
      setData(data.data)
      setIsLoading(false)
    })
    
    

  },[])

  const Check_key = (e)=>{

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
        <h1 className='text-2xl'>Loading...</h1>


     </div>
    </>)
  }

  return (
    <>
     <div className='min-h-screen bg-slate-800 flex flex-col gap-5 justify-center items-center text-white text-center' >

      <img src={data.avatar} className='rounded-xl h-80' />
      
    <h1>{data.User}</h1>
    <p>{data.body}</p>
     <input type="text" className='bg-transparent p-1 border border-slate-600 rounded-md focus:outline-none' onChange={(e)=>{
          setWord(e.target.value)
        }}  
       value={word}
       onKeyDown={(e)=>{
          Check_key(e)
        }}/>
      <div className='flex flex-col items-center justify-center'>
          {message?(message.map((data,index)=>{
            
            <p key={index}>{data.message}</p>
          })):(<p>no messages</p>)}
        </div>
     </div>
    </>
  )
}

export default App
