import React, {useEffect} from "react";
import styles from "./ProductList.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {initialProductsListTC} from "../../redux/list-reducer/list-reducer";
import {getProductList, getProductListInitialized} from "../../redux/list-reducer/list-selectors";
import LoadingSpinner from "../spinners/LoadingSpinner/LoadingSpinner";
import {Product} from "./Product/Product";

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
				<ul className={styles.productList}>
					{
						productList.map((product) => <Product key={product.id} id={product.id} name={product.colors[0].name} photo={product.colors[0].images[0]} />)
					}
				</ul>
			</section>
	)
};

export default React.memo(ProductList);