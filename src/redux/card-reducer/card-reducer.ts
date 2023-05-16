import {ProductCardInterface, ProductListType} from "../../types/ReduxTypes"
import {BaseThunkType, InferActionsTypes} from "../store"
import {deleteProductCard, getCard, setProductCard} from "../../services/cardAPI"
import {getProduct, getProductColor, getSize} from "../../services/api"

const initialState = {
	initialized: false,
	card: [],
} as ProductCardInterface


export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>

type ThunkType = BaseThunkType<ActionsTypes>


const cardReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

	switch (action.type) {

		case "SN/sidebar/INITIAL_CARD": {
			return {
				...state,
				card: action.card
			}
		}

		case "SN/sidebar/INITIALIZED": {
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
	initialCard: (card: any) => ({
		type: "SN/sidebar/INITIAL_CARD",
		card
	}) as const,

	initializedCard: (initialized: boolean) => ({
		type: "SN/sidebar/INITIALIZED",
		initialized
	}) as const,
}

export const initialCardTC = (): ThunkType => {
	return async (dispatch) => {
		dispatch(actions.initializedCard(false))

		const products = getCard()

		const productsId = products.map((product) => getProduct(product.id) as ProductListType)

		Promise.all(productsId).then((card) => {

			const withColors = products.map(async (item) => {
				const productColor = await getProductColor(item.id, item.color)
				return {
					...item,
					colors: productColor,
				}
			})

			return Promise.all(withColors)

		}).then((card) => {

			const withSizesColors = products.map(async (item, i) => {
				const productSize = await getSize(+item.size)

				const body = JSON.parse(JSON.stringify(card[i]))
				body.colors.sizes = productSize

				return body
			})

			return Promise.all(withSizesColors)
		}).then((finalCard) => {

			dispatch(actions.initialCard(finalCard))

			dispatch(actions.initializedCard(true))
		})
	}
}

export const deleteCardTC = (id: number, color: number, size: number): ThunkType => {
	return async (dispatch) => {
		deleteProductCard(id, color, size)
		dispatch(initialCardTC())
	}
}

export const setProductCardTC = (id: number, color: number, size: number): ThunkType => {
	return async (dispatch) => {
		setProductCard(id, color, size)
		dispatch(initialCardTC())
	}
}


export default cardReducer