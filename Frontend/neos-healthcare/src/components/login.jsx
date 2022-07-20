import { useState } from 'react';
// import React from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import './login.css'
import { isLoggedin } from '../Redux/login/action';
import { UserDetails } from '../Redux/user/action';
 export const Login = ()=>{
    const [user,setUser] = useState({
        email:"",
        password:""
    })
    const dispatch = useDispatch();
    // console.log(user)

    const handleChange = (e)=>{
        const {name,value} = e.target;

        setUser({
            ...user,
            [name]:value
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault();

        fetch("https://todoibackend.herokuapp.com/api/loginuser",{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(user)
     }).then((res) => res.json())
     .then((data) => {
      if(data.message)
      {
        alert(data.message)
      }
      else{
        // console.log("user",data)
        // setUserDetails(data)
        dispatch(isLoggedin(true))
        dispatch(UserDetails(data))
        navigate('/loginSuccessful')
      }
     })
    }
    const navigate = useNavigate();
    return(
        <div className="inputbox">
            <h2>Login</h2>
            <form action="" onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter Email"  name="email" onChange={handleChange} required autoFocus/> <br />
                <input type="password" name="password" placeholder="Enter Password" onChange={handleChange}  required/> <br />
                {/* <button className='btn' onClick={handleSubmit}>Login</button> */}
                <input type="submit" value="Login"  />
            </form>
            <h5 className='createacc'
            onClick={()=>navigate("/signup")}
            >Don't have an account? Create account</h5>
        </div>
    )
}

// export default React.memo({Login})