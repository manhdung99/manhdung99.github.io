import Nav from './Component/Nav/nav';
import ButonCss from './Component/ButtonCss/ButonCss';
import TodoList from './Component/todoList/todoList';
import User from './Component/User/User';
import ListPost from './Component/posts/ListPosts';
import PostDetail from './Component/posts/PostDetail';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
    <div className="App">
      <Nav />
   <Switch>
          <Route path="/button" >
            <ButonCss />
          </Route>
          <Route path="/todo">
            <TodoList />
          </Route>
          <Route path="/user">
            <User />
          </Route>
          <Route path="/post" exact>
            <ListPost />
          </Route>
          <Route path="/post/:id">
            <PostDetail />
          </Route>
  </Switch> 
    </div>
  </Router>
  
  );
}

export default App;
