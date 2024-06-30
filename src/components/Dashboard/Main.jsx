import React from 'react'
import MyMain from './Main/MyMain'
import Styles from '../../assets/css/dashboard/main.module.css'
import Header from './Main/Header'


function Main() {
  return (
    <main className={Styles.main}>
      <Header />
      <MyMain/>
    </main>
  )
}

export default Main
