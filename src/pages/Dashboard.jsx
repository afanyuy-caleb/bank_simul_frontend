import React, { useContext, useEffect } from 'react'
import MyContext from '../config/MyContext'
import { useNavigate } from 'react-router-dom'
import Main from '../components/Dashboard/Main'
import NavBar from '../components/Dashboard/NavBar'
import Styles from '../assets/css/dashboard/dashboard.module.css'
import Aside from '../components/Dashboard/Aside'


function Dashboard() {
  const nav = useNavigate()
  useEffect(()=>{
    if(! localStorage.getItem('userInfo')){
      nav("/index")
    }
  }, [])

  return (
    <div className={Styles.body}>
      <NavBar />
      <Main />
      <Aside />
      
    </div>
  )
}

export default Dashboard
