import React, {useEffect, useState} from "react"
import styles from "./CardIconBlock.module.scss"
import {useSelector} from "react-redux"
import {NavLink} from "react-router-dom"
import {getProductCard} from "../../../redux/card-reducer/card-selectors"

export const CardIconBlock: React.FC = () => {
	const BACKGROUND_ICON = {
		zero: "#b6b6b6",
		many: "#008600",
	};

	const productCard = useSelector(getProductCard)

	const [zeroLengthStyle, setZeroLengthStyle] = useState({backgroundColor: BACKGROUND_ICON.zero})

	useEffect(() => {
		if(productCard.length === 0) {
			setZeroLengthStyle({backgroundColor: BACKGROUND_ICON.zero})
		} else {
			setZeroLengthStyle({backgroundColor: BACKGROUND_ICON.many})
		}
	}, [productCard])

	return (
		<NavLink to={"/card"}>
			<div className={styles.cardIconBlock}>
				<span className={styles.cardIconBlock__count} style={zeroLengthStyle}>{productCard.length}</span>
			</div>
		</NavLink>
	)
}

export default React.memo(CardIconBlock)