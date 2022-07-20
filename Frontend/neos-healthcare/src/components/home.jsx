// import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { isLoggedin } from "../Redux/login/action";
import { UserDetails } from "../Redux/user/action";

export const Home = ()=>{
    // const {login,setLogin} = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    useEffect(()=>{
        dispatch(isLoggedin(false))
        dispatch(UserDetails({}))
    },[])
    return(
        <div>
          <div>
             <h2>Welcome to Todo App</h2>
            <button className="btn" onClick={()=>{navigate('/login')}}>Login</button>
          </div>
        </div>
    )
}