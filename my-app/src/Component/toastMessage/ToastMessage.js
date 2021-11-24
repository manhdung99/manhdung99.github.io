import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheckCircle,faExclamationCircle,faTimes} from '@fortawesome/free-solid-svg-icons'
import { useState,useEffect } from 'react'
import "./toastMessage.scss"
export default function ToastMessage() {

    const [toasts,setToasts] = useState([]);

    useEffect(()=>{
        const data =[{
            id:1,
            type:'success',
            title:'Success',
            icon : faCheckCircle,
            message:'Message'
        },
        {
            id:2,
            type:'success',
            title:'Success',
            icon : faCheckCircle,
            message:'Message'
        }]
        setToasts(data)
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
            id:1,
            type:type,
            title:title,
            icon : icon,
            message:message
        }
        console.log(toasts)
        const newData = [...toasts];
        console.log(newData)
        setToasts(toastProperty);
        console.log(toasts)
    }
    return (
        <div className ="toast--container" >
            <button
            onClick = {() =>showToast('success', 'Success Message' )}
            >Success</button>
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

            <div className = "toast-css success ">
            <div className = "toast-icon  ">
                <FontAwesomeIcon icon = {faCheckCircle} />
            </div>
            <div className = "toast-body">
                <h4 className = "toast-body-title">Success</h4>
                <p className = "toast-body-message">Success message Success message Success message Succe</p>
            </div>
            <div className = "toast-close">
                <span>
                    <FontAwesomeIcon icon = {faTimes} />
                </span>
            </div>
            </div>
            <div className = "toast-css warning ">
            <div className = "toast-icon">
                <FontAwesomeIcon icon = {faExclamationCircle} />
            </div>
            <div className = "toast-body">
                <h4 className = "toast-body-title">Warning</h4>
                <p className = "toast-body-message">Success message Success message Success message Succe</p>
            </div>
            <div className = "toast-close">
                <span>
                    <FontAwesomeIcon icon = {faTimes} />
                </span>
            </div>
            </div>
            <div className = " toast-css error ">
            <div className = "toast-icon ">
                <FontAwesomeIcon icon = {faExclamationCircle} />
            </div>
            <div className = "toast-body">
                <h4 className = "toast-body-title">Error</h4>
                <p className = "toast-body-message">Success message Success message Success message Succe</p>
            </div>
            <div className = "toast-close">
                <span>
                    <FontAwesomeIcon icon = {faTimes} />
                </span>
            </div>
            </div>
        </div>
    )
}
