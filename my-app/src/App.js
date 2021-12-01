import Nav from './Component/Nav/nav';
import ButonCss from './Component/ButtonCss/ButonCss';
import TodoList from './Component/todoList/todoList';
import ListPost from './Component/posts/ListPosts';
import PostDetail from './Component/posts/PostDetail';
import ToastMessage from './Component/toastMessage/ToastMessage';
import Login from './Component/login/Login';
import { connect } from 'react-redux';
import "./fontawesome"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './Component/Home/Home';

function App({isLogin}) {
  return (
    <Router>
    <div className="App">
      {isLogin && <Nav />}
   <Switch>
          <Route path="/" exact >
            <Home />
          </Route>
          <Route path="/button" >
            <ButonCss />
          </Route>
          <Route path="/todo">
            <TodoList />
          </Route>
          <Route path="/post" exact>
            <ListPost />
          </Route>
          <Route path="/post/:id">
            <PostDetail />
          </Route>
          <Route path="/toast">
            <ToastMessage />
          </Route>
          <Route path="/login" >
            <Login />
          </Route>
  </Switch> 
    </div>
  </Router>
  
  );
}
const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getListTodo: (list) => dispatch({ type: "LIST_TODO", payload: list }),
    updateTodo: (todo) => dispatch({ type: "UPDATE_TODO", payload: todo }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps) (App);
