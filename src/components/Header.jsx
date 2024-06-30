import logo2 from '../assets/images/logo_original.png'
import Styles from'../assets/css/modules/home.module.css'

function Header(){

    const ulClass = `${Styles.active} ${Styles.home}`
    return (
        <header className={Styles.header}>
            <div className={Styles.logo}>
                <img src={logo2} alt=""/>
            </div>
            <nav>
                <ul>
                    <li className={ulClass}>
                        <a href="/index" className={Styles.Headerlist}>
                            <span className={Styles.icon}>
                            <i className="fas fa-house"></i>    
                            </span>
                            <span className={Styles.text}>Home</span>
                        </a>
                    </li>
                    <li className={Styles.about}>
                        <a href="#about" className={Styles.list}>
                            <span className={Styles.icon}>
                            <i className="fas fa-users"></i>
                            </span>
                            <span className={Styles.text}>About Us</span>
                        </a>
                    </li>
                    <li className={Styles.services}>
                        <a href="#services" className={Styles.list}>
                            <span className={Styles.icon}>
                            <i className="fas fa-gear"></i>
                            </span>
                            <span className={Styles.text}>Services</span>
                        </a>
                    </li>
                    <li className={Styles.contact}>
                        <a href="#contact" className={Styles.list}>
                            <span className={Styles.icon}>
                            <i className="fas fa-phone"></i>
                            </span>
                            <span className={Styles.text}>Contact</span>
                        </a>
                    </li>
                    
                </ul>
            
            </nav>
        
    </header>
    );
}

export default Header