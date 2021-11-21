import React from 'react'
import './ButtonAwesome.scss'

export default function ButtonAwesome() {

    const url = ""

    return (
        <div className = "middle">
            <div className = "btn-wrap">
            <a href = {url}  className = "btn btn1">Hover Me</a>
            <a href = {url}  className = "btn btn2">Hover Me</a>
            <a href = {url}  className = "btn btn3">Hover Me</a>
            <a href = {url}  className = "btn btn4">Hover Me</a>
            </div>
        </div>
    )
}
