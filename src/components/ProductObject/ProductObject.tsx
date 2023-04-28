import React, {useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import styles from "./ProductObject.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {actions, initialProductObjectTC} from "../../redux/object-reducer/object-reducer";
import {getObjectInitialized, getObjectProduct} from "../../redux/object-reducer/object-selectors";
import LoadingSpinner from "../spinners/LoadingSpinner/LoadingSpinner";

export const ProductObject: React.FC = () => {
	const dispatch = useDispatch<any>();
	const [searchParams] = useSearchParams();

	const productObject = useSelector(getObjectProduct);
	const initialPage = useSelector(getObjectInitialized);

	useEffect(() => {
		const idParam = Number(searchParams.get('id'));
		dispatch(initialProductObjectTC(idParam));

		return () => dispatch(actions.clearProductObject());
	}, []);

	return (
		!initialPage ?
			<LoadingSpinner/>

			:

			<section className={styles.productObjectSection}>

			</section>
	)
};

export default ProductObject;