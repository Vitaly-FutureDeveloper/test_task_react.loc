import {createSelector} from 'reselect';
import {AppStateType} from "../store";

const getObjectSelector = (state:AppStateType) => {
	return state.productObject.product;
};
export const getObjectProduct = createSelector(getObjectSelector, (product) => product);

const getSizeSelectSelector = (state:AppStateType) => {
	return state.productObject.sizeSelect;
};
export const getSizeSelect = createSelector(getSizeSelectSelector, (sizeSelect) => sizeSelect);


const getObjectInitializedSelector = (state:AppStateType) => {
	return state.productObject.initialized;
};
export const getObjectInitialized = createSelector(getObjectInitializedSelector, (initialized) => initialized);

