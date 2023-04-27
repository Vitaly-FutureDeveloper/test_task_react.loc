import {createSelector} from 'reselect';
import {AppStateType} from "../store";

const getProductListSelector = (state:AppStateType) => {
	return state.productList.products;
};
export const getProductList = createSelector(getProductListSelector, (products) => products);
