import React, {useEffect} from "react"
import styles from "./Card.module.scss"
import {useDispatch, useSelector} from "react-redux"
import {getCardInitialized, getProductCard} from "../../redux/card-reducer/card-selectors"
import {initialCardTC} from "../../redux/card-reducer/card-reducer"
import Product from "./Product/Product"
import LoadingSpinner from "../spinners/LoadingSpinner/LoadingSpinner"

export const Card: React.FC = () => {
	const dispatch = useDispatch<any>()

	const productCard = useSelector(getProductCard)
	const initialPage = useSelector(getCardInitialized)

	useEffect(() => {
		dispatch(initialCardTC())
	}, [])

	return (

		!initialPage ?
			<LoadingSpinner/>

			:

			<section className={styles.card}>
				<ul className={styles.cardList}>
					{
						productCard?.map((product) => <Product
							key={`unic_product_${product.id + product.colors.id + product.colors.sizes.id}`}
							id={product.id}
							name={product.name}
							color={product.colors}
							size={product.colors.sizes.label}
							photo={product.colors.images[0]}/>)
					}
				</ul>
			</section>
	)
};

export default React.memo(Card)