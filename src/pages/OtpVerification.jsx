import { useState, useEffect, useContext } from 'react'
import Styles from '../assets/css/modules/otp.module.css'
import axios from 'axios'
import MyContext from '../config/MyContext'
import { useNavigate } from 'react-router-dom'

const OtpVerification = () => {
    const {regData, setFormMsg} = useContext(MyContext)
    const redirect = useNavigate()
    const [loader, setLoader] = useState(false)

    useEffect(() =>{
        if(Object.keys(regData).length == 0){
            redirect("/")
        }
    }, [])

    let otpEmail = regData['email']     
    
    let mailSketch = otpEmail.substring(0, 2) + '...' + otpEmail.substring(otpEmail.lastIndexOf('@'))

    const [otp, setOtp] = useState(new Array(6).fill(""))
    const [isOk, setIsOk] = useState(false)

    const handleOnChange = (e, ind)=>{
        if(isNaN(e.target.value)) return false;

        setOtp([...otp.map((dt, index) =>(index === ind ? e.target.value : dt))])

        if(e.target.value && e.target.nextSibling){
            e.target.nextSibling.focus()
        }

        if(ind == 5){
            setIsOk(true)
        }
    }
    
    const handleSubmit = async (event) =>{
        event.preventDefault()

        setLoader(true)
        try{
            let url = `http://localhost:3001/users/register`
            let fd = new FormData()

            for(let key in regData){
                fd.append(key, regData[key])
            }
            fd.append('otp_code', Number(otp.join('')))

            const response = await axios.post(url, fd)
            setLoader(false)

            if(response.data['status']){
                if(regData['page'] === 'login'){
                    redirect("/dashboard")

                }else{
                    setFormMsg({status: true, msg: "Registration successful"})
                    redirect("/signin")
                }
            }
            else{
                setFormMsg({status: false, msg: "Registration failed"})
                redirect("/signup")
            }

        }catch(error){
            console.log(error);
        }     
    }

    return (
        <section className={Styles.body}>
            <section className={Styles.otp_section}>
                <h3>Enter Verification code</h3>
                <p>Enter the 6-digit code that has been sent to your email address, {mailSketch}</p>
                <div className={Styles.otp_area}>
                    {   otp.map((data, i)=>{
                            return <input 
                            key={i}
                            type='text' 
                            value={data} 
                            maxLength={1}
                            onChange={(e)=> {handleOnChange(e, i)}}/>
                        })
                    }
                </div>
                
                { isOk?
                    <button className={Styles.active} onClick={handleSubmit}> 
                    {   (! loader) ?
                            <span>Verify</span>
                            :
                            <i className="fa fa-spinner fa-spin"></i>
                    }
                    </button>
                    :
                    <button disabled={true}> Verify </button>
                }
            </section>
        </section>
    )
}

export default OtpVerification
