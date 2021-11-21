const initState = {
  users: [
    { id: 1, name: "DungNM" },
    { id: 2, name: "HOc Lap Trinh" },
    { id: 3, name: "Dung HOc Lap Trinh" },
  ],
  todos: [],
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "LIST_TODO":
      return {
        ...state,
        todos: action.payload,
      };
    case "ADD_TODO":
      let newTodos = [...state.todos, action.payload];
      return {
        ...state,
        todos: [...newTodos],
      };
    case "DELETE_TODO":
       let newDeleteTodos = [...state.todos];
       newDeleteTodos = newDeleteTodos.filter(newTodo => newTodo.id !== action.payload)
      return {
        ...state,
        todos: [...newDeleteTodos],
      };
    case "LIST_USER":
      return {
        ...state,
        users: action.payload,
      };
    case "DELETE_USER":
      let users = state.users;
      users = users.filter((user) => user.id !== action.payload.id);
      console.log(users);
      return {
        ...state,
        users,
      };
    default:
      return state;
  }
};

export { rootReducer };