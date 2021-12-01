import React from "react";
import "./Login.scss";
import { useState ,useEffect} from "react";
import { useHistory } from "react-router";
import { connect } from "react-redux";
 const Login = ({updateIsLogin,isLogin}) => {

    const [error,setError] = useState(false)
    const [accout,setAccout] =  useState({
        username:'',
        password :''
    });
    const history = useHistory()
    const userAccout = {
        username: 'DungNM25',
        password : "123456"
    }
    
    useEffect(()=>{
      if(isLogin){
        history.push('/')
      }
    })
    const handleLogin = () =>{
        if(accout.username === userAccout.username && accout.password === userAccout.password){
            updateIsLogin(true)
            localStorage.setItem('isLogin',true)
            history.push('/')
        }else{
            setError(true)
        }
    } 
    const handleChangeUser = (e) =>{
        setError(false)
        setAccout({...accout,username:e.target.value})
    }
    const handleChangePassWord = (e) =>{
        setError(false)
        setAccout({...accout,password:e.target.value})
    }
    document.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
       event.preventDefault();
       handleLogin();
      }
    })

  return (
      <div className = "login-page">
    <div className="login-container">
      <h1 className="login-title">Accout Login</h1>
      <div className="login-form">
        <label className="login-label" htmlFor=" ">
          UserName
        </label>
        <input className="login-input"
         value = {accout.username} onChange = {e =>handleChangeUser(e)}  />
         {error && <span className = "login-invalid">username or password is wrong!</span>}
      </div>
      <div className="login-form">
        <label className="login-label" htmlFor=" ">
          PassWord
        </label>
        <input className="login-input" type = "password"
         value = {accout.password} onChange = {e =>handleChangePassWord(e)}   />
         {error && <span className = "login-invalid">username or password is wrong!</span>}
      </div>
      <div className="login-selection">
        <div className="login-remember">
          <input className="remember-input" type="checkbox" />
          <label className="remember-label"> Remember Me</label>
        </div>
        <label className="forgot-label"> Forgot PassWord?</label>
      </div>
      <button className="login-btn" onClick = {() => handleLogin()}>Log in</button>
    </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    isLogin :state.isLogin
  };
};

const mapDispatchToProps  = (dispatch) =>{
    return {
        updateIsLogin : (value) => dispatch({type:'UPDATE_LOGIN',payload:value})
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (Login)

