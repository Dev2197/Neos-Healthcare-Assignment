export const Add_Todo = "ADD_TODO";


export const addTodo = (data)=>{
    return{
        type:Add_Todo,
        payload : data
    }
}

export const getTodos = (id)=>async(dispatch)=>{
    
    const data = await fetch(`https://todoibackend.herokuapp.com/usertasks/${id}`).then((x)=>x.json());
    // console.log(data);
    if(data.message)
    {
        return;
    }
    else{
    dispatch(addTodo(data))
    }
}