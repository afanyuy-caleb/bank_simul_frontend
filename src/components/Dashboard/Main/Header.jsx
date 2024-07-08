import Styles from '../../../assets/css/dashboard/header.module.css'
import { useNavigate } from 'react-router-dom'


export default function Header() {
  const nav = useNavigate()
  const Logout = ()=>{
    localStorage.clear()
    nav('/')
  }

  return (
    <header className={Styles.header}>

      <h2>Dashboard</h2>

      <div className={Styles.header_search}>  
        <form action="" method="POST">
          <input type="text" placeholder="Search for activity" name="search" /> 
          <button>
            <i type="submit" className="fas fa-search" title="search"></i>
          </button>  
        </form>  
      </div>

      <button disabled={true} className={Styles.notif_btn}>
        <i className="fas fa-bell" title="cart" id="cart">
          <span id="pd_qnty_num">
            2
          </span>
        </i>
      </button>

      <button className={Styles.close_btn} onClick={Logout}>
        <i className="fas fa-power-off" title="logout" id="logout_btn">
        </i>
      </button>
      
  </header>
  )
}
