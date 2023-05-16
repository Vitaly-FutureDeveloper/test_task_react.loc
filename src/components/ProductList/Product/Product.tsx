import React from "react"
import styles from "./Product.module.scss"
import {Link} from "react-router-dom"


interface PropsType {
	id: number,
	name: string,
	photo: string,
}

export const Product: React.FC<PropsType> = ({id, name, photo}) => {

	return (
		<li className={styles.productList__item}>
			<Link to={`/object?id=${id}`}>
				<div className={styles.productList__block}>
					<img src={photo} alt={"Фото товара"}/>
					<p>{name}</p>
				</div>
			</Link>
		</li>
	)
}

export default React.memo(Product)