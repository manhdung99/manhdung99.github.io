import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheckCircle,faExclamationCircle,faTimes} from '@fortawesome/free-solid-svg-icons'
import { useState,useEffect } from 'react'
import "./toastMessage.scss"
export default function ToastMessage() {

    const [toasts,setToasts] = useState([]);

    useEffect(()=>{
        
    },[])
    
    const showToast = (type,message) =>{
        const icons = {
            success: faCheckCircle,
            warning:faExclamationCircle,
            error:faExclamationCircle
        }
        const titles = {
            success: 'Success',
            warning:'Warning',
            error:'Error'
        }
        const icon = icons[type]
        const title = titles[type]
        
        const toastProperty = {
            id:Math.floor(Math.random()*10000),
            type:type,
            title:title,
            icon : icon,
            message:message
        }
        setToasts([...toasts,toastProperty]);
        setTimeout(()=>{
            autoClose(toastProperty.id);
          },4000);
    }
    const autoClose = (id) =>{
        let data = toasts.filter(toast => toast.id !== id);
        setToasts(data)
    }
    
    return (
        <div className ="toast--container" >
            {console.log("render")}
            <button
            onClick = {() =>showToast('success', 'Success Message' )}
            >Success</button>
            <button
            onClick = {() =>showToast('warning', 'Warning Message' )}
            >Warning</button>
            <button
            onClick = {() =>showToast('error', 'Error Message' )}
            >Error</button>
            {toasts.length > 0 && toasts.map((toast,index) => (
                <div key = {index} className = {"toast-css " + toast.type}>
                <div className = "toast-icon  ">
                    <FontAwesomeIcon icon = {toast.icon} />
                </div>
                <div className = "toast-body">
                    <h4 className = "toast-body-title">{toast.title}</h4>
                    <p className = "toast-body-message">{toast.message}</p>
                </div>
                <div className = "toast-close">
                    <span>
                        <FontAwesomeIcon icon = {faTimes} />
                    </span>
                </div>
                </div>
            ))}
        </div>
    )
}
