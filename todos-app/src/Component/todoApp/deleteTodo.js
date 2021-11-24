import React from 'react'
import { Modal } from 'react-bootstrap'
import "./deleteTodo.scss"

export default function DeleteTodo({show,handleCloseDeleteForm,handleDeleteTodo,deleteTodo}) {
    return (
        <Modal show={show} onHide={handleCloseDeleteForm}>
        <div className = "delete-wrap">
        <h1 className = "delete-title">Delete Todo</h1>
        <p className = "delete-body">Are you sure you want to delete this todo ?</p>
        <button
        className = "btn-delete-form cancel-btn" 
        onClick = {handleCloseDeleteForm}
        >Cancel</button>
        <button
        className = "btn-delete-form delete-btn"
        onClick = {()=>{handleDeleteTodo(deleteTodo.id)}} 
        >Delete</button>
        </div>
      </Modal>
    )
}
