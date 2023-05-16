import {Action, applyMiddleware, combineReducers, createStore} from "redux"
import thunkMiddleware, {ThunkAction} from "redux-thunk"

import listReducer from "./list-reducer/list-reducer"
import cardReducer from "./card-reducer/card-reducer"
import objectReducer from "./object-reducer/object-reducer"

const reducers = combineReducers({
	productCard: cardReducer,
	productList: listReducer,
	productObject: objectReducer
})

type RootReducerType = typeof reducers
export type AppStateType = ReturnType<RootReducerType>


export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>


// @ts-ignore
const store = createStore(reducers, applyMiddleware(thunkMiddleware))


export default store