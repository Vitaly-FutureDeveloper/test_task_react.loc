import React from "react"
import styles from "./Product.module.scss"
import {useDispatch} from "react-redux"
import {Link} from "react-router-dom"


interface PropsType {
	id: number,
	title: string,
	category: string,
	brand: string,
};

export const Product: React.FC<PropsType> = ({id, title, category, brand}) => {
	const dispatch = useDispatch<any>();

	const onClickObject = () => {

	};

	return (
		<li className={styles.productList__item}>
			<Link to={`/object?id=${id}`}>

			</Link>
		</li>
	);
};

export default React.memo(Product);