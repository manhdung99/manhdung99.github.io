import React from "react";
import { useEffect, useState, useRef } from "react";
import "./listTodo.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen, faCheck } from "@fortawesome/free-solid-svg-icons";
import DeleteTodo from "./deleteTodo";

export default function ListTodo() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const inputRef = useRef();
  const [show, setShow] = useState(false);
  const [deleteTodo, setDeleteTodo] = useState();
  const [editTodo,setEditTodo] = useState({});
  const [sort,setSort] = useState(false)


  let isEmptyEditTodo = Object.keys(editTodo).length === 0;
  useEffect(() => {
    const defaultData = [
      {
        id: 1,
        name: "Bai Tap So 1",
        status: true,
      },
      {
        id: 2,
        name: "Bai Tap So 2",
        status: false,
      },
      {
        id: 3,
        name: "Bai Tap So 3",
        status: false,
      },
    ];
    setTodos(defaultData);
  }, []);
  const handleAddTodo = () => {
      if(!todo){
          alert('Todo không được để trống')
          return;
      }
    let data = {
      id: Math.floor(Math.random() * 1000),
      name: todo,
      status: false,
    };
    setTodos([data,...todos]);
    setTodo("");
    inputRef.current.focus();
  };
  const handleUpdateStatus = (todo) => {
    let statusUpdate = !todo.status;
    const objIndex = todos.findIndex((obj) => obj.id === todo.id);
    todos[objIndex].status = statusUpdate;
    setTodos([...todos]);
  };
  const handleCloseDeleteForm = () => {
    setShow(false);
  };
  const handleOpenDeleteForm = (todo) => {
    setDeleteTodo(todo);
    setShow(true);
  };
  const handleDeleteTodo = (id) => {
        let newTodos = [...todos];
        newTodos = newTodos.filter(newTodo => newTodo.id !== id)
        setTodos([...newTodos]);
        setShow(false)
  }
  const handleEditTodo = (todo) =>{
    if ((isEmptyEditTodo === false) & (editTodo.id === todo.id)) {
        let newTodos = [...todos];
       let objIndex = newTodos.findIndex((obj) => obj.id === todo.id);
       newTodos[objIndex] = editTodo;
       setTodos([...newTodos])
        setEditTodo({});
        return;
      }
      // Edit data
      setEditTodo(todo)

      return;
  }
  const handleSortByName = () =>{
      if(sort===false){
        const newdata = todos.sort((a, b) => {
            if (a.name < b.name)
              return -1;
            if (a.name > b.name)
              return 1;
            return 0;
          });
          setTodos([...newdata])
          setSort(true)
      }else{
        const newdata = todos.sort((a, b) => {
            if (a.name < b.name)
              return 1;
            if (a.name > b.name)
              return -1;
            return 0;
          });
          setTodos([...newdata])
          setSort(false)
      }
    
  }


  return (
      <>
    <DeleteTodo
    show={show}
    handleCloseDeleteForm={handleCloseDeleteForm}
    handleDeleteTodo={handleDeleteTodo}
    deleteTodo={deleteTodo}
  />
    <div className="todo-container">
    <button className = "todo-sort-button" onClick= {handleSortByName}>Sort by Name</button>
      <h1 className="title">Work to-dos</h1>
      <p className="add-new-note">
        Enter text into the input field to add items to your list
      </p>
      <p className="update-note">
        Click <FontAwesomeIcon icon={faPen} /> to update item
      </p>
      <p className="status-note">Click the item to mark item complete</p>
      <p className="remove-note">
        Click the "X" to remove the item from your list
      </p>
      <input
        ref={inputRef}
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className="todo-input"
        type="text"
        placeholder="New item ..."
      />
      <button onClick={() => handleAddTodo()} className="add-button">
        <FontAwesomeIcon icon={faPlus} />
      </button>
      <ul className="todo-list">
        {todos.map((todo) => (
          <div key={todo.id} className="item-wrap">
            <div className="todo-wrap">
                {isEmptyEditTodo  ? (
              <li
                onClick={() => handleUpdateStatus(todo)}
                className="todo-item"
              >
                {todo.name}
              </li>
              )
              : todo.id === editTodo.id ?
              (
              <li
                className="todo-item"
              >
                <input
                style = {{width:"350px"}}
                value={editTodo.name}
                onChange={(e) =>
                setEditTodo({ ...editTodo, name:e.target.value })
                }
                />
              </li>
              ) 
              :
              (
                <li
                onClick={() => handleUpdateStatus(todo)}
                className="todo-item"
              >
                {todo.name}
              </li> 
              )
                }
              <span
                onClick={() => handleOpenDeleteForm(todo)}
                className="todo-close"
              >
                x
              </span>
            </div>
            <button
            onClick = {()=>handleEditTodo(todo)}
            className="todo-edit">
                {isEmptyEditTodo === false && todo.id === editTodo.id ?
              <FontAwesomeIcon icon={faCheck} />
              :
              <FontAwesomeIcon icon={faPen} />
                }
            </button>
            {todo.status ? (
              <span className="todo-status">
                <FontAwesomeIcon icon={faCheck} />
              </span>
            ) : (
              <span className="todo-status"></span>
            )}
          </div>
        ))}
      </ul>
    </div>
    </>
  );
}
