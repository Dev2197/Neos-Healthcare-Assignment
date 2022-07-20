import { Login } from "./action"

let init = {Login:false}
export const LoginReducer = (store=init,action)=>{
    switch(action.type){
        case Login:
            return {...store,Login:action.payload}
        default:
            return store
    }
}