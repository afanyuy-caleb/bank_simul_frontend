import React from 'react'
import Header from '../components/Header'
import Styles from '../assets/css/modules/nopage.module.css'

function Nopage() {
  return (
    <div className={Styles.noPage_body}>
      <Header />
      <h2>Page Not Found</h2>

    </div>
  )
}

export default Nopage
