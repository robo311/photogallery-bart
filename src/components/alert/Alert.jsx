import React, { useEffect } from 'react';
import { GoAlertFill } from "react-icons/go"
import { IoMdCheckmarkCircleOutline } from "react-icons/io"

function Alert({ alertMessage, setAlertMessage }) {

    useEffect(() => {
        
        const timeout = setTimeout(() => {
            setAlertMessage({name: "", successful: false})
        }, 5000)

        return () => clearTimeout(timeout)
    }, [alertMessage])
    
  return (
    <div className="alert-wrapper">
        {alertMessage.successful ? <IoMdCheckmarkCircleOutline color='green' size={25}/> : <GoAlertFill color='red' size={25}/>}
        {alertMessage.message}
    </div>
  )
}

export default Alert