import {toast} from 'react-toastify'

export const handleAxiosErrors = (err, errorHandler = null)=>{
    if(err.code.toLowerCase() == "err_network"){
        toast("Network Error: \nCouldn't reach the server", {
            type: 'error',
        })

    }else if(err.code.toLowerCase() == "err_bad_request"){ 
        const {msg} = err.response.data

        if(msg['hostname']?.startsWith('smtp') || (msg.indexOf('smtp') != -1)){
            toast(`Network Error: \nCouldn't reach the server,
            please check you internet connection    `, {
                type: 'error',
            })  
        }
        else{
            if(errorHandler){
                errorHandler(err.response)
            }else{
                toast(`Network Error: ${msg}`, {
                    type: 'error',
                })
            }
        }
    }else{
        toast("We have a problem at our end, \nplease try again later", {type: 'error'})
    }
}