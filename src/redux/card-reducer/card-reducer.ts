import {ProductCardInterface} from "../../types/ReduxTypes"
import {BaseThunkType, InferActionsTypes} from "../store"
import {deleteProductCard, getCard, setProductCard} from "../../services/cardAPI"
import {getProductColor} from "../../services/api"

const initialState = {
	initialized: false,
	card: [],
} as ProductCardInterface;


export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;

type ThunkType = BaseThunkType<ActionsTypes>;


const cardReducer = (state=initialState, action:ActionsTypes): InitialStateType => {

	switch (action.type){

		case "SN/sidebar/INITIAL_CARD": {
			return {
				...state,
				card: action.card
			};
		}



		case "SN/sidebar/INITIALIZED": {
			return {
				...state,
				initialized: action.initialized
			};
		}


		default:
			return state;
	}
};

export const actions = {
	initialCard : (card: any) => ({
		type: "SN/sidebar/INITIAL_CARD",
		card
	}) as const,

	initializedSidebar : (initialized: boolean) => ({
		type: "SN/sidebar/INITIALIZED",
		initialized
	}) as const,
};

export const initialCardTC = ():ThunkType => {
	return async (dispatch) => {
		dispatch(actions.initializedSidebar(false))

		const products = getCard()
		const productsColors = products.map((product) => getProductColor(product.id, product.name))

		Promise.all(productsColors).then((card) => {
			const withSizes = card.map((item) => ({
				...item,
				...item.colors,
				sizes: [item.size]
			}))
			dispatch(actions.initialCard(withSizes))

			dispatch(actions.initializedSidebar(true))
		})
	}
};

export const deleteCardTC = (id:number, color:string, size:number):ThunkType => {
	return async (dispatch) => {
		deleteProductCard(id, color, size)
		dispatch( initialCardTC() )
	}
};

export const setProductCardTC = (id:number, color:string, size:number):ThunkType => {
	return async (dispatch) => {
		setProductCard(id, color, size)
		dispatch( initialCardTC() )
	}
};





export default cardReducer;