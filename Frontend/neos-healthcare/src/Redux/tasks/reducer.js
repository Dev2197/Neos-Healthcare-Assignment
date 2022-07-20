import { Add_Todo } from "./action";

const init = {todos:[]}
export const TodoReducer = (store=init,action)=>{
    switch(action.type){
        case Add_Todo:
            return{...store, todos: action.payload}
        default:
            return store;
    }
}