import {createSelector} from 'reselect';
import {AppStateType} from "../store";

const getProductBrandsSelector = (state:AppStateType) => {
	return state.productCard.card;
};
export const getProductCard = createSelector(getProductBrandsSelector, (brandsCheckboxes) => brandsCheckboxes);


const getSidebarInitializedSelector = (state:AppStateType) => {
	return state.productCard.initialized;
};
export const getCardInitialized = createSelector(getSidebarInitializedSelector, (initialized) => initialized);


