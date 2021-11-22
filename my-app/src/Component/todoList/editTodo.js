import React from "react";

const EditTodo = ({ todoEdit, setTodoEdit }) => {
  return (
    <>
      <td className="todo-item">
        <input
          value={todoEdit.workName}
          onChange={(e) =>
            setTodoEdit({ ...todoEdit, workName: e.target.value })
          }
        />
      </td>
      <td className="todo-item">
        <input
          type="date"
          style={{ width: "140px" }}
          value={todoEdit.startDate}
          onChange={(e) =>
            setTodoEdit({
              ...todoEdit,
              startDate: e.target.value,
            })
          }
        />
      </td>
      <td className="todo-item">
        <input
          type="date"
          style={{ width: "140px" }}
          value={todoEdit.endDate}
          onChange={(e) =>
            setTodoEdit({ ...todoEdit, endDate: e.target.value })
          }
        />
      </td>
      <td className="todo-item">
        <select
          value={todoEdit.todoStatus}
          onChange={(e) =>
            setTodoEdit({
              ...todoEdit,
              todoStatus: e.target.value,
            })
          }
        >
          <option value="Planing">Planing</option>
          <option value="Complete">Complete</option>
        </select>
      </td>
    </>
  );
};

export default EditTodo;
