import { User } from "./action"

let init = {user:{}}
export const UserReducer = (store=init,action)=>{
    switch(action.type){
        case User:
            return {...store,user:action.payload}
            default:
                return store
    }
}