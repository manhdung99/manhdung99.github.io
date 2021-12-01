const initState = {
  users: [
    { id: 1, name: "DungNM" },
    { id: 2, name: "HOc Lap Trinh" },
    { id: 3, name: "Dung HOc Lap Trinh" },
  ],
  todos: [],
  isLogin: localStorage.getItem('isLogin'),
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "UPDATE_LOGIN":
      return {
        ...state,
        isLogin: action.payload,
      }
    case "LIST_TODO":
      return {
        ...state,
        todos: action.payload,
      };
    case "ADD_TODO":
      {
      let newTodos = [...state.todos, action.payload];
      return {
        ...state,
        todos: [...newTodos],
      }
    };
    case "DELETE_TODO":
      {
       let newTodos = [...state.todos];
       newTodos = newTodos.filter(newTodo => newTodo.id !== action.payload)
      return {
        ...state,
        todos: [...newTodos],
      }};
      case "UPDATE_TODO":
      {
       let newTodos = [...state.todos];
       let objIndex = newTodos.findIndex((obj) => obj.id === action.payload.id);
       newTodos[objIndex] = action.payload;
      return {
        ...state,
        todos: [...newTodos],
      }};
      case "FILTER_TODO":
      {
       let newTodos = [...action.payload];
      return {
        ...state,
        todos: [...newTodos],
      }};
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
