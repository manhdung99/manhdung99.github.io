


const initState = {
    users : [
        {id:1, name : 'DungNM'},    
        {id:2, name : 'HOc Lap Trinh'},
        {id:3, name : 'Dung HOc Lap Trinh'}
    ]
}

const rootReducer = (state = initState , action) =>{
    switch(action.type){
        case 'List':
            return{
                ...state,
                users : action.payload
            }
        case 'DELETE':
            let users = state.users;
            users = users.filter(user => user.id !== action.payload.id)
            console.log(users)
        return {
            ...state,users
        };
        default :
        return state; 
    }   
}

export default rootReducer;