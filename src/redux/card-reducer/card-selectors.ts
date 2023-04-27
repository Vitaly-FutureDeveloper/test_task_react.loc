import {createSelector} from 'reselect';
import {AppStateType} from "../store";

const getProductBrandsSelector = (state:AppStateType) => {
	return state.sidebar.brands;
};
export const getProductBrands = createSelector(getProductBrandsSelector, (brandsCheckboxes) => brandsCheckboxes);


const getSidebarInitializedSelector = (state:AppStateType) => {
	return state.sidebar.initialized;
};
export const getSidebarInitialized = createSelector(getSidebarInitializedSelector, (initialized) => initialized);


