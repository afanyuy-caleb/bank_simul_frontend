import React, { useContext } from 'react'
import Styles from '../../assets/css/dashboard/aside.module.css'
import logo2 from '../../assets/images/logo2.png'
import card from '../../assets/images/card.png'
import MyContext from '../../config/MyContext'


function Aside() {
  
  const handleOnclick = () =>{
    console.log("This is such a great deal")
  }
  const userInfo = JSON.parse(localStorage.userInfo)

  const userPic = `data:image/jpeg;base64,${userInfo.profilePic}` || logo2;

  return (
    <section className={Styles.section}>
      <div className={Styles.prof_image} title="View profile">
          <img src={userPic} alt="" />
      </div>    
      <h3 className={Styles.user_name}>
        {userInfo.name || "Our Guest"}
      </h3>

      <div className={Styles.acc_type}>
        <i className='fas fa-star'></i>
        <span>hello</span>
      </div>

      <div className={Styles.actions}>
        <div className={Styles.act}>
          <i className='fas fa-download' onClick={handleOnclick}></i>
          <span>Top up</span>
        </div>

        <div className={Styles.act}>
          <i className='fas fa-share-from-square'></i>
          <span>Transfer</span>
        </div>

        <div className={Styles.act}>
          <i className='fas fa-arrow-up-from-bracket'></i>
          <span>Withdraw</span>
        </div>

      </div>

      <div className={Styles._card}>
        <h4>Your cards</h4>
        <img src={card} alt=''/>
      </div>

    </section>
  )
}

export default Aside
