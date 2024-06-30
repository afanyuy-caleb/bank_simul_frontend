import React from 'react'
import {Link} from 'react-router-dom'
import img from '../assets/images/golden.png'
import video from '../assets/video/background_vid.mp4'
import Styles from '../assets/css/modules/home.module.css'


function Landing(){
    return (
        <main className={Styles.main}>
            <video autoPlay plays-inline="true" muted loop className={Styles.back_vid}>
                <source src={video} type="video/mp4" />
            </video>

            <section className={Styles.landing_sect}>
                <section className={Styles.section1}>
                    <div className={Styles.text_area}>
                        <h1>Smart Banking to Manage your Money & Transactions</h1>
                        <p>At ASI, we will you manage your money and transactions easily. Just follow the instructions and you'll be fine</p>
                    
                    </div>
                    <div className={Styles._link}>         
                        <Link to="/signin" className={Styles.form_link}>GET STARTED</Link>
                        <Link to="/signup" className={Styles.form_link}>OPEN ACCOUNT</Link>
                
                    </div>
                </section>

                <section className={Styles.img_sect}> 
                    <img src={img} alt=""/>
                </section>

            </section>

            <section className={Styles.activities}>
                <div>
                    <i className="fas fa-shield"></i>
                    <p>Protect Payment</p>
                    <hr />
                    <p>We provide protection, such that all your transactions are save</p>
                </div>

                <div>
                    <i className="fas fa-quote-left"></i>
                    <p>Easy To Use</p>
                    <hr />
                    <p>We make it easier for you to use the existing features</p>
                </div>

                <div>
                    <i className="fas fa-lock"></i>
                    <p>Security First</p>
                    <hr />
                    <p>We highly prioritize your safety, in all our endeavors and features</p>
                </div>

            </section>

        </main>

    )
}

export default Landing