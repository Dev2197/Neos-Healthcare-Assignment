import { useDispatch, useSelector } from 'react-redux'
import './navbar.css'
import { useNavigate } from 'react-router-dom'
import { isLoggedin } from '../Redux/login/action'
import { UserDetails } from '../Redux/user/action'
export const Navbar = ()=>{
    const navigate = useNavigate()
    const login = useSelector(store=>store.Login.Login)
    const dispatch = useDispatch()

    const handleLogout = ()=>{
        dispatch(isLoggedin(false))
        dispatch(UserDetails({}))
        navigate('/')
    }
    console.log(login)
    return(
        <div className="navbar">
            <div style={login? {marginLeft:"400px"}:null}>Todo Application</div>
            {login ? <div style={{color:"white",justifySelf : "flex-end"}} onClick={handleLogout}>Logout</div>:null}
        </div>
    )
}