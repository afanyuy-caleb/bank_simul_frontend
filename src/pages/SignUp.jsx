import React, { useContext, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import '../assets/css/phone.css'
import Styles from '../assets/css/modules/reg.module.css'
import logo2 from '../assets/images/logo2.png'
import { useState } from "react"
import PhoneInput from "react-phone-input-2"
import 'react-phone-input-2/lib/style.css'
import { validate } from "email-validator"
import axios from "axios"
import MyContext from "../config/MyContext"
import classNames from "classnames"
import {toast} from 'react-toastify'


function SignUp(){
    const errorHandler = (response)=>{
    // Handling the error responses
        switch (response.data['field']){
            case 'form':
                setSwapPage(false)
                setValidForm({
                    state: false,
                    msg: response.data['msg']
                })
                break;  
            case 'email': 
                setSwapPage(false)
                setValidEmail({
                    state: false,
                    msg: response.data['msg']
                })
                break;
            case 'pass':
                setSwapPage(true)
                setValidPassword({
                    state: false,
                    msg: response.data['msg']
                })
                break
            case 'passcnf':
                setSwapPage(true)
                setValidPassCnf({
                    state: false,
                    msg: response.data['msg']
                })
                break

            case 'identity':
                setSwapPage(true)
                setValIdPic({
                    state: false,
                    msg: response.data['msg']
                })
                break
            case 'profilePic':
                setSwapPage(true)
                setValPic({
                    state: false,
                    msg: response.data['msg']
                })
                break
            
            default:
                console.log(response.data);
                break;
        }
    }

    let docUrl = document.URL.substring(0, document.URL.lastIndexOf('/'))

    const {setRegData, formMsg} = useContext(MyContext);
    const [swapPage, setSwapPage] = useState(false)
    const [loader, setLoader] = useState(false)
    const redirect = useNavigate()
    const [formData, setFormData] = useState({
        page: "register",
        name : "",
        email: "",
        dob: "",
        tel: "",
        address: "",
        acc_type: "checking",
        identity: "",
        profilePic: "",
        pass: "",
        passcnf: ""
    })

    const [pass_pic, setPassPic] = useState()
    const [prof_pic, setProfPic] = useState();
    const [phoneNumber, setPhoneNumber] = useState('')
    
    const [validPhone, setValidPhone] = useState(true)
    const [validEmail, setValidEmail] = useState({
        state: true,
        msg: ''
    })
    const [validPassword, setValidPassword] = useState({
        state: true,
        msg: ''
    })
    const [validPassCnf, setValidPassCnf] = useState(true)
    const [validForm, setValidForm] = useState(formMsg)
    const [validIdPic, setValIdPic] = useState({
        state: true,
        msg: ''
    })
    const [validPic, setValPic] = useState({
        state: true,
        msg: ''
    })
    const idRef = useRef(null)
    const picRef = useRef(null) 

    const handleTelChange = (value)=>{
        setPhoneNumber(value)
        setValidPhone(value.length === 12)

        setFormData((preve)=>{
            return {
                ...preve,
                tel: phoneNumber
            }
        })
    }

    const handleOnChange = (event)=>{
        let {value, name} = event.target

        if(event.target.type === 'file'){
            value = event.target.files[0];

            (name === 'identity')? setPassPic(URL.createObjectURL(value)) : setProfPic(URL.createObjectURL(value))
        }

        if(name === 'email'){
            setValidEmail({
                state: validate(value),
            });
        }

        if(name === 'passcnf'){
            value !== formData['pass'] ? setValidPassCnf(false): setValidPassCnf(true)
        }

        setFormData((preve) =>{
            return{
                ...preve,
                [name] : value
            }
        })
    }

    const pass_verify = (value) =>{
        let state = true;
        let msg = ""
        if(value.length < 5){
            state = false
            msg = "password must be atleast 5 characters"
        }
        else{
            let pattern = /[^a-zA-Z0-9]/
            if(! pattern.test(value)){
                state = false
                msg = "password must contain a special character"
            }
            else{
                pattern = /[A-Z0-9]/
                if(! pattern.test(value)){
                    state = false
                    msg = "password must contain a CAPS and a digit"
                }
            }
        }

        if(! state){
            setValidPassword({
                state,
                msg
            })
            return false;
        }

        return true;
    }

    const handleOnSubmit = (event)=>{
        event.preventDefault()
        
        if(! swapPage ){
            if(! validEmail || ! validPhone){
                setValidForm({
                    state: false,
                    msg: "Invalid Form credentials"
                })
            }
            else{
                formData['tel'].length < 1 ?
                    setValidPhone(false)
                    :
                    setSwapPage(true)
                }
            }
        else{
            if(pass_verify(formData['pass'])){
                setLoader(true)
                postData()
            }
        }
    }

    const postData = async () =>{
        try{     
            const formDt = new FormData()
            
            for(let key in formData){
                formDt.append(key, formData[key])
            }
            
            const url = 'http://localhost:3001/users/activate'

            await axios.post(url, formDt)
            .then((response)=>{
                setLoader(false)
                console.log(response.data)

                if(response.data['status']){
                    setRegData(formData)
                    redirect("/otp")
                }
                else{
                    errorHandler(response)
                }
            })
            .catch(err=>{
                setLoader(false)
                
                console.log(err)
                if(err.code.toLowerCase() == "err_network"){
                    toast("Network Error: \nCouldn't reach the server", {
                        type: 'error',
                    })
                }else if(err.code.toLowerCase() == "err_bad_request"){ 
                    errorHandler(err.response)
                }
                else{
                    toast("We have a problem at our end, \nplease try again later", {type: 'error'})
                }
            })            
        }catch(error){
            console.log("There is an error: ", error)

            setValidForm({
                state: false,
                msg: error
            })
        }
    }

     // The function for the view password button

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

    const handlePic = (e)=>{
        if(e.target.id == 'idId'){
            idRef.current.click()
        }else{
            picRef.current.click()
        }
    }


    return(
        <section className={Styles.body}>
            <div className={Styles.divsec}>

                <div className={Styles.close}>
                    <Link to="/" className={classNames('fas fa-x', Styles.closeIcon)}></Link>
                </div>

                <div className={Styles.image_section}>
                    <div className={Styles.textArea}>
                        <div className={Styles.logo}>
                            <img src={logo2} alt="" />
                        </div>
                        <h3>
                            Double the Experience, with ASI
                        </h3>

                        {! swapPage ? <p>We need your basic information to personalize your experience</p>:
                        <div className={Styles.__images}>
                            <div>
                                <img src={pass_pic} alt="" id="idId" onClick={handlePic}/>
                                <span>Identity</span>
                            </div>
                            <div>
                                <img src={prof_pic} alt="" id="prof_id" onClick={handlePic}/>
                                <span>Selfie</span>
                            </div>
                        </div>

                        }
                    </div>
                    <div className={`${Styles.textArea2}`}>
                        <span>
                            Do not be afraid of Falling...<br/>
                            Keep hoping you'll rise after the fall <br/> !!!
                        </span>
                    </div>
                </div>

                <div className={Styles.form_section}>
                    <h3>Create your account now</h3>

                    <div className={Styles.step_divs}>
                        <span className={`${Styles.step_num} ${Styles.active}`} onClick={()=>setSwapPage(false)}>
                            1
                            <span>Account</span>
                        </span>

                        <span className={! swapPage ? Styles._line: `${Styles._line} ${Styles.active}`}></span>
                        <span className={! swapPage ? Styles.step_num: `${Styles.step_num} ${Styles.active}`}>2
                            <span>Identification</span>
                        </span>
                    </div>

                    <form method="POST" encType="multipart/form-data" onSubmit={handleOnSubmit}>
                        {! swapPage?
                        <>
                            <div className={Styles.input_sect}>
                                <input onChange={handleOnChange} value={formData['name']} type="text" name="name" id="name" className={Styles.input_pad} required />
                                <i className="fas fa-user"></i>
                                <label htmlFor="name">Full name</label>

                                {!validForm['state'] && <p className={Styles.form_indicator}>
                                    {validForm['msg']}
                                </p>
                                }
                            </div>

                            <div className={Styles.input_sect}>
                                <input onChange={handleOnChange} value={formData['email']} type="email" name="email" id="email" required className={Styles.input_pad}/>
                                <i className="fas fa-envelope"></i>
                                <label htmlFor="email">Email</label>

                                {! validEmail['state'] && <p className={Styles.error_msg}>
                                    {validEmail['msg']}
                                </p>}
                            </div>

                            <div className={Styles.input_sect}>
                                <input onChange={handleOnChange} value={formData['dob']} type="date" name="dob" id="date" required className={Styles.input_pad} />
                                <label htmlFor="date">Date of Birth</label>
                            </div>

                            <div className={Styles.input_sect}>
                                <input onChange={handleOnChange} value={formData['address']} type="text" name="address" id="address" required className={Styles.input_pad}/>
                                <i className="fas fa-location"></i>
                                <label htmlFor="address">Address(current city)</label>
                            </div>

                            <div className={Styles.input_sect}>
                                <PhoneInput
                                    country={'cm'}
                                    name="tel"
                                    id="tel"
                                    onChange={handleTelChange}
                                    inputProps={{required: true}}
                                    countryCodeEditable={false}
                                    containerClass="phone-input-container"
                                    inputClass="phone-input"
                                    dropdownClass="phone-dropdown"
                                />
                                <i className="fas fa-phone"></i>
                                <label htmlFor="tel">Phone Number</label>

                                {! validPhone && <p className={Styles.error_msg}>
                                    This phone number is invalid
                                </p>}
                            </div>
                        </>
                            :
                        <>
                            <div className={Styles.input_sect}>
                                <input onChange={handleOnChange} value={formData['pass']} type="password" name="pass" id="pass" required className={Styles.input_pad}/>
                                <i className="fas fa-eye" onClick={handlePassIcon}></i>
                                <label htmlFor="pass">Password</label>

                                {! validPassword['state'] && <p className={Styles.error_msg}>
                                    {validPassword['msg']}
                                </p>}
                            </div>

                            <div className={Styles.input_sect}>
                                <input onChange={handleOnChange} value={formData['passcnf']} type="password" name="passcnf" id="passcnf" required className={Styles.input_pad}/>
                                <i className="fas fa-eye" onClick={handlePassIcon}></i>
                                <label htmlFor="passcnf">Password Confirmation</label>

                                {! validPassCnf && <p className={Styles.error_msg}>
                                    passwords do not match
                                </p>}

                            </div>       

                            <fieldset>
                                <legend>Front side CNI/Passport</legend>
                                <input 
                                    onChange={handleOnChange} 
                                    type="file" 
                                    name="identity" 
                                    accept="image/*"
                                    required = {true}
                                    ref={idRef}
                                />
                                {! validIdPic['state'] && <p className={Styles.error_msg}>
                                    {validIdPic['msg']}
                                    </p>
                                }
                            </fieldset>

                            <fieldset>
                                <legend>Selfie</legend>
                                <input 
                                    onChange={handleOnChange} 
                                    type="file" 
                                    accept="image/*"
                                    name="profilePic"
                                    ref={picRef}
                                />
                                {! validPic['state'] && <p className={Styles.error_msg}>
                                    {validPic['msg']}
                                    </p>
                                }
                            </fieldset>


                            <fieldset>
                                <legend>Type of Account</legend>
                                <div>
                                    <input onChange={handleOnChange} type="radio" name="acc_type" value="checking" id="acc1" checked/>
                                    <label htmlFor="acc1">Checking Account</label>
                                </div>

                                <div>
                                    <input onChange={handleOnChange} type="radio" name="acc_type" value="savings" id="acc2"/>
                                    <label htmlFor="acc2">Savings Account</label>
                                </div>
                            </fieldset>
                        </>
                        }
                        
                        <button type="submit" className={Styles.submit_btn} id={loader? "_loader": ''}>
                            {
                                (! loader) ?
                                    <>
                                        <span>{swapPage ? "Register": "Continue"}</span> 
                                    </>
                                    :
                                    <>
                                        <span>Registering</span>
                                    </>
                            }
                        </button>

                        <p className={Styles.form_link}>
                            Already have an account?
                            <Link to="/signin"> Login</Link>
                        </p>
                    </form>
                    {
                        loader && 
                        <div className={Styles.loadingForm}>
                            <i className="fa fa-spinner fa-spin" ></i>
                        </div>
                    }
                </div>
            </div>
        </section>
    )
}

export default SignUp