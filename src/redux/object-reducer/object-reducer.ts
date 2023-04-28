import {ProductListType, ProductObjectInterface} from "../../types/ReduxTypes";
import {BaseThunkType, InferActionsTypes} from "../store";
import {getProduct} from "../../services/api"

const initialState = {
	initialized: false,
	product: null as ProductListType | null
} as ProductObjectInterface;


export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;

type ThunkType = BaseThunkType<ActionsTypes>;


const objectReducer = (state=initialState, action:ActionsTypes): InitialStateType => {

	switch (action.type){

		case "SN/productObject/INITIAL_PRODUCT_OBJECT": {
			return {
				...state,
				product: action.product
			}
		}

		case "SN/productObject/CLEAR_PRODUCT_OBJECT": {
			return {
				...state,
				initialized: false,
				product: null,
			};
		}

		case "SN/productObject/INITIALIZED": {
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
	initialProductObject : (product: any) => ({
		type: "SN/productObject/INITIAL_PRODUCT_OBJECT",
		product
	}) as const,

	clearProductObject : () => ({
		type: "SN/productObject/CLEAR_PRODUCT_OBJECT",
	}) as const,

	initializedProductObject : (initialized: boolean) => ({
		type: "SN/productObject/INITIALIZED",
		initialized
	}) as const,
};

export const initialProductObjectTC = (id:number):ThunkType => {
	return async (dispatch) => {
		dispatch(actions.initializedProductObject(false));
		try{
			const productObject = await getProduct(id);
			dispatch(actions.initialProductObject(productObject));
			dispatch(actions.initializedProductObject(true));
		} catch (e) {
			throw e;
		}
	}
};

export default objectReducer;