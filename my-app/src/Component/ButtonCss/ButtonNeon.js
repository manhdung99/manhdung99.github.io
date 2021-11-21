import React from 'react'
import "./ButtonNeon.scss"

export default function ButtonNeon() {
    return (
        <div className = "neon-button">
            <button className = 'btn'  >
                <span className = "btn-span1"></span>
                <span className = "btn-span2"></span>
                <span className = "btn-span3"></span>
                <span className = "btn-span4"></span>
                Hover Me
            </button>
        </div>
    )
}
