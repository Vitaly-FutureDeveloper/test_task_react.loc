import React from "react"
import styles from "./Product.module.scss"
import {useDispatch} from "react-redux"
import {Link} from "react-router-dom"
import {ProductColorType} from "../../../types/ReduxTypes";
import {deleteCardTC} from "../../../redux/card-reducer/card-reducer";


interface PropsType {
	id: number,
	name: string,
	photo: string,
	size: string
	color: ProductColorType
};

export const Product: React.FC<PropsType> = ({id, name, photo, size, color}) => {
	const dispatch = useDispatch<any>();

	const onDeleteProductCard = () => {
		dispatch(deleteCardTC(id, color.id, color.sizes.id))
	}

	return (
		<li className={styles.productList__item}>
			<Link to={`/object?id=${id}`}>
				<div className={styles.productList__block}>
					<img src={photo} alt={"Фото товара"}/>
					<h2>{name}</h2>
					<p>Цвет: {color.name}</p>
					<p>Размер: {size}</p>
					<p>Цена: {color.price}</p>
				</div>
			</Link>
			<button onClick={onDeleteProductCard}>Удалить</button>
		</li>
	);
};

export default React.memo(Product)