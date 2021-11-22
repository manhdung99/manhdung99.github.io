import React from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import axios from "axios";

const DeleteTodo = ({showDeleteForm,handleCloseDeleteForm,todoDelete,deleteTodo}) =>{

        const handleDeleteTodo = async () =>{           
            await axios.delete(`http://localhost:8081/todo/delete/${todoDelete.id}`)
            deleteTodo(todoDelete.id)
            handleCloseDeleteForm();
        } 
        return (
        <Modal show={showDeleteForm} onHide={handleCloseDeleteForm}>
        <div className = "delete-wrap">
        <h1 className = "delete-title">Delete Todo</h1>
        <p className = "delete-body">Are you sure you want to delete this todo ?</p>
        <button
        className = "btn-delete-form cancel-btn" 
        onClick = {handleCloseDeleteForm}
        >Cancel</button>
        <button
        className = "btn-delete-form delete-btn"
        onClick = {()=>{handleDeleteTodo()}} 
        >Delete</button>
        </div>
      </Modal>

        )
}
const mapDispatchToProps  = (dispatch) =>{
    return {
        deleteTodo : (id) => dispatch({type:'DELETE_TODO',payload:id})
    }
}
export default connect(null,mapDispatchToProps) (DeleteTodo);