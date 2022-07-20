export const Login = "Login"

export const isLoggedin = (data)=>{
    return {
        type:Login,
        payload : data
    }
}