import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './login.css'
import { isLoggedin } from '../Redux/login/action';
import { UserDetails } from '../Redux/user/action';
import { useDispatch } from 'react-redux';
export const SignUp = ()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user,setUser] = useState({
        userName : "",
        email : "",
        password : "",
        phoneno : ""
    })

    const handleChange = (e)=>{
        const {name,value} = e.target;

        setUser({
            ...user,
            [name]:value
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault();

        fetch("https://todoibackend.herokuapp.com/api/createuser",{
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
        // setName(data.userName)
        dispatch(isLoggedin(true))
        dispatch(UserDetails(data))
        navigate('/loginSuccessful')
      }
     })
    }
    return(
        <div className="inputbox">
            <h2>Sign up</h2>
            <form action="" onSubmit={handleSubmit}>
                <input type="text" placeholder='Enter Name'  name='userName' required autoFocus onChange={handleChange}/> <br />
                <input type="email" placeholder="Enter Email"  name="email" required onChange={handleChange} /> <br />
                <input type="password" name="password" placeholder="Enter Password"  required onChange={handleChange} /> <br />
                <input type="number" placeholder='Enter Mobile number' name='phoneno' required onChange={handleChange}/> <br />
                {/* <button className='btn' onClick={handleSubmit}>Create account</button> */}
                <input type="submit" value="Create Account"  />
            </form>
        </div>
    )
}