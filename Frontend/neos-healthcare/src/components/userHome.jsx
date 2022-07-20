import { useEffect, useState } from "react"
import {  useDispatch, useSelector } from "react-redux";
import { getTodos } from "../Redux/tasks/action";
import { Timer } from "./timer";
import './userHome.css'


export const UserHome = ()=>{
    const dispatch = useDispatch();
    const [text,setText] = useState("");
    // const [userName,setUserName] = useState('')
    const name = useSelector(store=>store.User.user.userName)
    const id = useSelector(store=>store.User.user.id)
    const tasks = useSelector(store=>store.Todos.todos)
    // console.log(tasks);

    const handleadd = ()=>{
        const payload = {
            title : text,
            userId : id
        }

        fetch("https://todoibackend.herokuapp.com/api/createtask",{
            method:"Post",
            headers:{
                "content-type":"Application/json",
            },
            body:JSON.stringify(payload)
        }).then(()=>{
            dispatch(getTodos(id))
        })
    }

    const handleDeltete = (id,userId)=>{
        // console.log(id,userId)

        fetch(`https://todoibackend.herokuapp.com/api/deletetask/${id}`, {
            method: 'DELETE',
          }).then(()=>dispatch(getTodos(userId)));
    }

    useEffect(()=>{
        dispatch(getTodos(id))
    },[])

    const handleCompltete = (id,userId)=>{
        fetch(`https://todoibackend.herokuapp.com/api/updatetask/${id}`,{
            method:"PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ "status": true, "userId":userId }),
        }).then(()=>dispatch(getTodos(userId)));
    }
    
    
    return(
        <div>
            <h1>Welcome {name}</h1>
            <div>
                <input type="text" placeholder="Enter Task" onChange={(e)=>{setText(e.target.value)}}/>
                <button onClick={handleadd}>Add Task</button>
            </div>
            {tasks.length === 0 ? 
            <h5 className='createacc'>No Tasks Found</h5>:
            tasks.map((e)=>(
                <div className="Tasks" key={e.id}>
                    <p style={{color:"blue"}}>{e.title}</p>
                    {e.status ? <h5 style={{color:"green"}}>Task Completed</h5> : <Timer />}
                    {e.status ? null : <button style={{background:"green",border:"none",color:"white",cursor:"pointer"}} onClick={()=>{handleCompltete(e.id,e.userId)}}>Complete Task</button>}
                    <button style={{background:"red",border:"none",color:"white",cursor:"pointer"}} onClick={()=>{handleDeltete(e.id,e.userId)}}>Delete</button>
                </div>
            ))}
        </div>
    )
}