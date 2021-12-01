import React from 'react'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import "./Home.scss"

const  Home = ({isLogin}) =>{

    const history = useHistory()
    useEffect(() =>{
        if(isLogin === false){
            history.push("/login")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div className = "home">
           {isLogin &&
           <div className = "home-container">
            <span className= "home-title">
           Welcome To My App
           </span>
           </div>
            }
        </div>
    )
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
  
  export default connect(mapStateToProps, mapDispatchToProps) (Home)
