import {ProductListInterface} from "../../types/ReduxTypes"
import {BaseThunkType, InferActionsTypes} from "../store"

import {getProducts} from "../../services/api"

const initialState = {
	initialized: false,
	products: [],
} as ProductListInterface


export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>

type ThunkType = BaseThunkType<ActionsTypes>


const listReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

	switch (action.type) {

		case "SN/productList/INITIAL_PRODUCT_LIST": {
			return {
				...state,
				products: action.products
			}
		}

		case "SN/productList/INITIALIZED": {
			return {
				...state,
				initialized: action.initialized
			}
		}

		default:
			return state
	}
}

export const actions = {
	initialProductsList: (products: any) => ({
		type: "SN/productList/INITIAL_PRODUCT_LIST",
		products
	}) as const,

	initializedList: (initialized: boolean) => ({
		type: "SN/productList/INITIALIZED",
		initialized
	}) as const,
}

export const initialProductsListTC = (page: number = 1): ThunkType => {
	return async (dispatch) => {
		dispatch(actions.initializedList(false))
		try {
			const productList = await getProducts()

			dispatch(actions.initialProductsList(productList))
			dispatch(actions.initializedList(true))
		} catch (e) {
			throw e
		}
	}
}


export default listReducer;