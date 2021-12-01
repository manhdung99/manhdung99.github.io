import React from 'react'
import { useState,useRef } from 'react'

export default function FilterTodo({onFilter}) {
    const [dataFilter,setDataFilter] = useState('')
    const typingTimeoutRef = useRef(null)
    const handleFilterTodo = (e) =>{
        let data  = e.target.value;
        setDataFilter(data)

        if(typingTimeoutRef.current){
            clearTimeout(typingTimeoutRef.current)
        }

        typingTimeoutRef.current = setTimeout(() =>{
            onFilter(e.target.value)
        },1000)
    }
    console.log(dataFilter)
    return (
        <div>
            <input
            value = {dataFilter} onChange = { e => handleFilterTodo(e)}
             className = "search-input" type= "text" placeholder = "Search here"  /> 
        </div>
    )
}
