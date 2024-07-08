import Styles from '../../assets/css/dashboard/navbar.module.css'
import logo2 from '../../assets/images/logo2.png'
import MyContext from '../../config/MyContext'
import { useContext } from 'react'

export default function NavBar() {

  const {formDisplay} = useContext(MyContext)

  return (
    <section className={formDisplay['status']? Styles.section : Styles.section2}>
      <div className={Styles.logo}>
        <i>
          <img src={logo2} alt="" />
        </i> 
      </div>

      {formDisplay['status'] && 
        <div className={Styles.form}>
          <h3>{formDisplay['page']}</h3>

          <form action="" method='POST'>
            <input type="text" />
            <input type="text" />
            <input type="text" />

            <button type='submit'>submit</button>
          </form>
        </div>
      }
    </section>
  )
}


