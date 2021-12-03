import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import {Login} from '../containers/Login'
import {Home} from '../containers/Home'
import { useState } from 'react';
import { useEffect } from 'react';

const Index: NextPage = () => {
  const [accessToken, setToken] = useState('');

  useEffect(() => {
    if(typeof window !== 'undefined'){
      const token = localStorage.getItem('accessToken');
      if(token){
        setToken(token);
      }
    }
  }, []);
  
  return (
      accessToken ? <Home setToken={setToken}/>:<Login setToken={setToken}/>
      
  )
}

export default Index
