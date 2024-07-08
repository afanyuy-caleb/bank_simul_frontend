import Styles from '../../assets/css/dashboard/aside.module.css'
import logo2 from '../../assets/images/logo2.png'
import card from '../../assets/images/card.png'
import MyContext from '../../config/MyContext'
import { useContext } from 'react'

function Aside() {
  const {setFormDisplay} = useContext(MyContext)

  const handleOnclick = (e) =>{
    setFormDisplay({
      status: true,
      page: e.target.nextSibling.textContent
    })
  }
  const userInfo = JSON.parse(localStorage.userInfo)

  let userPic = btoa(String.fromCharCode(...new Uint8Array(userInfo.profilePic.data)))

  userPic = `data:image/jpeg;base64,${userPic}` || logo2;

  return (
    <section className={Styles.section}>
      <div className={Styles.prof_image} title="View profile">
          <img src={userPic} alt="need something here" />
      </div>    
      <h3 className={Styles.user_name}>
        {userInfo.name || "Our Guest"}
      </h3>

      <div className={Styles.acc_type}>
        <i className='fas fa-star'></i>
        <span>hello</span>
      </div>

      <div className={Styles.actions}>
        <div className={Styles.act} >
          <i className='fas fa-download' onClick={handleOnclick}></i>
          <span>Top up</span>
        </div>

        <div className={Styles.act}>
          <i className='fas fa-share-from-square' onClick={handleOnclick}></i>
          <span>Transfer</span>
        </div>

        <div className={Styles.act}>
          <i className='fas fa-arrow-up-from-bracket' onClick={handleOnclick}></i>
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
