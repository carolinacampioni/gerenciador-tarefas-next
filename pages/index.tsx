import type { NextPage } from 'next' 
import { useEffect } from 'react';
import { useState } from 'react'
import { Login} from '../containers/Login' 
import { Home} from '../containers/Home' 
import { useRouter } from 'next/router';


const Index: NextPage = () => {

  const [accessToken, setToken] = useState('');
  const router = useRouter();

  useEffect(() => {
    if(typeof window !== 'undefined'){
        const token = localStorage.getItem('accessToken');
        if(token){
          setToken(token);
        }
    }
  }, [])

  return (
   //  accessToken ? <Home setToken={setToken}/> : <Register />

    accessToken ? <Home setToken={setToken}/> : <Login setToken={setToken}/>
  )
}

export default Index
