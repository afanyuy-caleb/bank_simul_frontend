import { Link, useNavigate } from "react-router-dom"
import Styles from '../assets/css/modules/reg.module.css'
import logo2 from '../assets/images/logo_original.png'
import MyContext from "../config/MyContext"
import { useContext, useState } from "react"
import axios from "axios"
import classNames from "classnames"

function SignIn(){
    const {formMsg, setFormMsg, setRegData, setIsAuthenticated} = useContext(MyContext)
    const nav = useNavigate();

    const [loader, setLoader] = useState(false)
    const [formData, setFormData] = useState({
        page: "login",
        email: "",
        pass: ""
    })

    const handleOnchange = (event) =>{
        const {name, value} = event.target
        setFormData((preve) =>{
            return{
                ...preve,
                [name]: value
            }
        })
    }

    const handleOnSubmit = (event)=>{
        event.preventDefault()
        setLoader(true)
        postData()
    }

    const postData = async ()=>{
        let fD = new FormData();
        let url = 'http://localhost:3001/users/login'
 
        for(let key in formData){
            fD.append(key, formData[key])
        }

        const response = await axios.post(url, fD)
        setLoader(false)
        if(response.data['status']){
            localStorage.userInfo = JSON.stringify(response.data['msg'])
            if(response.data['msg'] === "Mail sent"){
                setRegData(formData)
                nav("/otp")
            }else{
            //    Set the userinfo
                nav("/dashboard")
            }
        }
        else{
            // Handling the error responses
            switch (response.data['field']){
                case 'form':
                    setFormMsg({
                        state: false,
                        msg: response.data['msg']
                    })
                    break;  
                default:
                    console.log(response.data)
            }
        }
    }

    const handlePassIcon = (event) => {
        let passInput = event.target.previousElementSibling
        
        if(passInput.type === "password"){
            passInput.type = "text";
            event.target.className = "fas fa-eye-slash";
        }
        else{
            passInput.type = "password";
            event.target.className = 'fas fa-eye';
        }
    }

    return(
        <section className={Styles.body}>
            <div className={Styles.divsec}>
                <div className={Styles.close}>
                    <Link to="/" className={classNames('fas fa-x', Styles.closeIcon)}></Link>
                </div>

                <div className={Styles.image_section}>
                    <div className={`${Styles.textArea} ${Styles.login_text}`}>
                        <div className={Styles.logo}>
                            <img src={logo2} alt="" />
                        </div>
                    
                    </div>
                    <div className={Styles.textArea2}>
                        <span>
                            Life is a battle<br />
                            How you win that battle is based <br />
                            on how Open you are to Opportunities
                            <br /> !!!
                        </span>
                    </div>

                </div>
                <div className={Styles.form_section}>
                    <form action="" method="POST" className={Styles.login} onSubmit={handleOnSubmit}> 
                        <h3>Login</h3>
                    
                        {formMsg['msg'] && 
                            <p 
                            className= {formMsg['status'] ? `${Styles._login_msg} ${Styles.form_indicator}` : `${Styles.__login_msg} ${Styles.form_indicator}`}
                            >
                                {formMsg['msg']}
                            </p>
                        }

                        <div className={Styles.input_sect}>
                            <input type="email" name="email" id="email" value={formData['email']} onChange={handleOnchange} required className={Styles.input_pad}/>
                            <i className="fas fa-envelope"></i>
                            <label htmlFor="email">Email</label>
                        </div>

                        <div className={Styles.input_sect}>
                            <input type="password" name="pass" id="pass" value={formData['pass']} onChange={handleOnchange}  required className={Styles.input_pad}/>
                            <i className="fas fa-eye" onClick={handlePassIcon}></i>
                            <label htmlFor="pass">Password</label>
                        </div>

                        <div className={Styles.remember_forgot}>
                            <div>
                                <input type="checkbox" id="remember" name="remember" />
                                <label htmlFor="remember">Remember me</label>
                            </div>
                            
                            <a href="">forgot password</a>
                        </div>

                        <button className={Styles.submit_btn} id={loader? "_loader": ''}>{
                                (! loader) ?
                                    <span>Login</span>
                                    :
                                    <i className="fa fa-spinner fa-spin"></i>
                            }
                        </button>

                        <p className={Styles.form_link}>Don't yet have an ASI account? <Link to="/signup">Open Account</Link></p>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default SignIn
