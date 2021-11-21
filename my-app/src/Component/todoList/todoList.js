import React from "react";
import "./todoList.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import AddTodo from "./addTodo";
import DeleteTodo from "./deleteTodo";
import { connect } from "react-redux";

const TodoList = ({ getListTodo, todos }) => {
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [todoDelete,setTodoDelete] = useState({})

  useEffect(() => {
    const ourRequest = axios.CancelToken.source();
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:8081/todo/listAll", {
          cancelToken: ourRequest.token, // <-- 2nd step
        });
        const items = response && response.data ? response.data : [];
        setLoading(false);
        getListTodo(items);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request Cancel :", error.message);
        }
      }
    }
    setTimeout(() => {
      fetchData();
    }, 2000);
    return () => {
      ourRequest.cancel("Cancel by user"); // <-- 3rd step
    };
              // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseAddForm = () => setShowAddForm(false);
  const handleShowAddForm = () => setShowAddForm(true);
  const handleCloseDeleteForm = () => setShowDeleteForm(false);
  const handleShowDeleteForm = (todo) => {
    setShowDeleteForm(true);
    setTodoDelete(todo)
  }
  return (
    <div className="todo-container">
      <DeleteTodo
        showDeleteForm={showDeleteForm}
        handleCloseDeleteForm={handleCloseDeleteForm}
        todoDelete = {todoDelete}
      />
      <AddTodo
        showAddForm={showAddForm}
        handleCloseAddForm={handleCloseAddForm}
      />
      <button onClick={handleShowAddForm} className="add-button">
        {" "}
        Add Todo
      </button>
      <h2 className="title">Todo List</h2>
      <table>
        <thead>
          <tr className="todo-header">
            <th className="header-item">ID</th>
            <th className="header-item">Work Name</th>
            <th className="header-item">Start Date</th>
            <th className="header-item">End Date</th>
            <th className="header-item">Status</th>
            <th className="header-item">Action</th>
          </tr>
        </thead>
        <tbody>
          {loading === false &&
            todos.map((todo, index) => (
              <tr className="todo-list" key={todo.id}>
                <td className="todo-item todo-id">{index + 1}</td>
                <td className="todo-item">{todo.workName}</td>
                <td className="todo-item">{todo.startDate}</td>
                <td className="todo-item">{todo.endDate}</td>
                <td className="todo-item">{todo.todoStatus}</td>
                <td className="todo-item todo-action">
                  <button className="btn-todo edit">Edit</button>
                  <button
                    onClick={()=>handleShowDeleteForm(todo)}
                    className="btn-todo delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          {loading === true && (
            <tr>
              <td className="loading"> Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteUserRedux: (userDelete) =>
    dispatch({ type: "DELETE", payload: userDelete }),
    getListTodo: (list) => dispatch({ type: "LIST_TODO", payload: list }),
    addListTodo: (todo) => dispatch({ type: "LIST_TODO", payload: todo }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
