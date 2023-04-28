import React from "react";
import styles from "./Card.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {getProductList, getProductListInitialized} from "../../redux/list-reducer/list-selectors";
import LoadingSpinner from "../spinners/LoadingSpinner/LoadingSpinner";

export const Card: React.FC = () => {
	const dispatch = useDispatch<any>();

	const productCard = useSelector(getProductList);
	const initialPage = useSelector(getProductListInitialized);



	return (

		!initialPage ?
			<LoadingSpinner/>

			:

			<section className={styles.card}>


			</section>
	)
};

export default React.memo(Card);