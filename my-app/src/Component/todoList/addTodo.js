import { Modal } from 'react-bootstrap'
import { useEffect,useState } from 'react'
import { connect } from 'react-redux'
import React from 'react'
import axios from 'axios'

 const AddTodo = ({showAddForm,handleCloseAddForm,addListTodo}) => {

        useEffect(()=>{

        })

        const [workName,setWorkName] = useState('')
        const [startDate,setStartDate] = useState('')
        const [endDate,setEndDate] = useState('')

        const handleAddTodo = async (workName,startDate,endDate) =>{
            let todo = 
                { 
                    "workName": workName,
                    "startDate": startDate,
                    "endDate": endDate,
                    "todoStatus": "Planing"
                }    
                console.log(todo)      
            let res = await axios.post('http://localhost:8081/todo/add',todo)
            addListTodo(res.data)
            handleCloseAddForm()
              
        }
    return (
        <div>
            <Modal show={showAddForm} onHide={handleCloseAddForm}>
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
        className = "btn-add-new"
        >ADD</button>
        </div>
      </Modal>
        </div>
    )
    
}

const mapStateToProps = (state) =>{
    return {
        todos : state.todos
   }
    
   }    
   const mapDispatchToProps  = (dispatch) =>{
       return {
           deleteUserRedux : (userDelete) => dispatch({type:'DELETE',payload:userDelete}),
           getListTodo : (list) => dispatch({type:'LIST_TODO',payload : list}),
           addListTodo : (todo) => dispatch({type:'ADD_TODO',payload : todo})
       }
   }

export default connect(mapStateToProps,mapDispatchToProps) (AddTodo);
