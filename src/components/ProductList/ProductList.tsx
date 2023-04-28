import React, {useEffect} from "react";
import styles from "./ProductList.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {initialProductsListTC} from "../../redux/list-reducer/list-reducer";
import {getProductList, getProductListInitialized} from "../../redux/list-reducer/list-selectors";
import LoadingSpinner from "../spinners/LoadingSpinner/LoadingSpinner";

export const ProductList:React.FC = () => {
	const dispatch = useDispatch<any>();

	const productList = useSelector(getProductList);
	const initialPage = useSelector(getProductListInitialized);

	useEffect(() => {
		dispatch(initialProductsListTC());
	}, []);

	return (

		!initialPage ?
			<LoadingSpinner/>

			:

			<section className={styles.productListPage}>


			</section>
	)
};

export default React.memo(ProductList);