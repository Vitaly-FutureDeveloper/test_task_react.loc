import React from "react"
import styles from "./CardIconBlock.module.scss"
import {useSelector} from "react-redux"
import {NavLink} from "react-router-dom"
import {getProductCard} from "../../../redux/card-reducer/card-selectors"

export const CardIconBlock: React.FC = () => {

	const productCard = useSelector(getProductCard)

	return (
		<NavLink to={"/card"}>
			<div className={styles.cardIconBlock}>
				<span className={styles.cardIconBlock__count}>{productCard.length}</span>
			</div>
		</NavLink>
	)
}

export default React.memo(CardIconBlock)