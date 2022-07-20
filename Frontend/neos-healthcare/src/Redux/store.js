import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from 'redux-persist/lib/storage'
import { LoginReducer } from "./login/reducer";
import { UserReducer } from "./user/reducer";
import { TodoReducer } from "./tasks/reducer";


const persistConfig = {
    key: 'Ecommerce',
    storage,
};

const rootReducer = combineReducers({
    Login : LoginReducer,
    User : UserReducer,
    Todos : TodoReducer
})

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = legacy_createStore(persistedReducer,applyMiddleware(thunk))

export const persistor = persistStore(store)