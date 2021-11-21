import React from 'react'
import { connect } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
const  User  = ({getList,deleteUserRedux,users}) => {
 
    useEffect(() => {
        async function fetchData() {
          // You can await here
          const response = await axios.get('https://jsonplaceholder.typicode.com/users');
          const {data} = response;
          getList(data);    
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    

    const handleDeleteUser = (user) =>{
        deleteUserRedux(user)
    }

    return (
        <div className = "about">
            <ul>
            {users.map((user,index)=> (
                <li key = {index} >
                    {user.id} - {user.name}
                    &nbsp;<span 
                    onClick = {()=> handleDeleteUser(user)}
                    > x </span>
                     </li>
            )
            )}
            </ul>
        </div>
    )
}
const mapStateToProps = (state) =>{
 return {
     users : state.users
}
 
}    
const mapDispatchToProps  = (dispatch) =>{
    return {
        deleteUserRedux : (userDelete) => dispatch({type:'DELETE_USER',payload:userDelete}),
        getList : (list) => dispatch({type:'LIST_USER',payload : list})
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (User);
