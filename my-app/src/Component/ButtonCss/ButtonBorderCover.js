import React from 'react'
import "./ButtonBorderCover.scss"
export default function ButtonBorderCover() {
    return (
        <div className = "border-cover">
            <button className = "btn">
                <span className ="btn-span1"></span>
                <span className ="btn-span2"></span>
                <span className ="btn-span3"></span>
                <span className ="btn-span4"></span>
                Hover Me
            </button>
        </div>
    )
}
