import React from 'react'
import Styles from '../../assets/css/dashboard/navbar.module.css'
import logo2 from '../../assets/images/logo2.png'


export default function NavBar() {
  return (
    <section className={Styles.section}>
      <div className={Styles.logo}>
        <i>
          <img src={logo2} alt="" />
        </i> 
        <p>ASI<span>Bank</span></p>
      </div>
      
    </section>
  )
}


