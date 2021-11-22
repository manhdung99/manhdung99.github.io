import { Modal } from 'react-bootstrap'
import {useState } from 'react'
import { connect } from 'react-redux'
import React from 'react'
import axios from 'axios'

 const AddTodo = ({showAddForm,handleCloseAddForm,addListTodo}) => {

        const [workName,setWorkName] = useState('')
        const [startDate,setStartDate] = useState('')
        const [endDate,setEndDate] = useState('')

        const handleCloseForm = () =>{
            handleCloseAddForm();
            setWorkName('');
            setStartDate('');
            setEndDate('');
        }

        const handleAddTodo = async (workName,startDate,endDate) =>{
            if(!workName){
                alert("Work Name is Empty!")
                return;
            }
            if(!startDate){
                alert("Start Date is Empty!")
                return;
            }
            if(!endDate){
                alert("End Date is Empty!")
                return;
            }
            if(Date.parse(startDate)>Date.parse(endDate)){
                alert("End Date must be greater Start Date!")
                return;
            }
            let todo = 
                { 
                    "workName": workName,
                    "startDate": startDate,
                    "endDate": endDate,
                    "todoStatus": "Planing"
                }    
            let res = await axios.post('http://localhost:8081/todo/add',todo)
            addListTodo(res.data)
            handleCloseAddForm()
              
        }
    return (
        <div>
            <Modal show={showAddForm} onHide={handleCloseForm}>
        <div className = "add-new-wrap">
        <h2 className = "add-new-title">---ADD NEW TODO---</h2>
        <div className = "input-data" >
        <label className ="title-input" >Work Name</label>
        <input
        value = {workName} onChange = {(e)=>{setWorkName(e.target.value)}}
        type = "text" placeholder = "Work name?"/>
        </div>
        <div className = "input-data" >
        <label className ="title-input" >Start Date</label>
        <input
        value = {startDate} onChange = {(e)=>{setStartDate(e.target.value)}}
        type = "date" placeholder = "Start Date?"/>
        </div>
        <div className = "input-data">
        <label className = "content-input">End Date</label>
        <input
        value = {endDate} onChange = {(e)=>{setEndDate(e.target.value)}}
        type = "date" placeholder = "End Date?" />
        </div>
        <button
        onClick = {() =>handleAddTodo(workName,startDate,endDate)}
        className = "btn-add-new-todo"
        >ADD</button>
        <button
        onClick = {handleCloseForm}
        className = "btn-add-new-cancel"
        >Cancel</button>
        </div>
      </Modal>
        </div>
    )
}    
   const mapDispatchToProps  = (dispatch) =>{
       return {
           addListTodo : (todo) => dispatch({type:'ADD_TODO',payload : todo})
       }
   }

export default connect(null,mapDispatchToProps) (AddTodo);
