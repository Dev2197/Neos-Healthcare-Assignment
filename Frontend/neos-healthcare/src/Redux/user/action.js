export const User = "User"

export const UserDetails = (data)=>{
    return {
        type:User,
        payload : data
    }
}