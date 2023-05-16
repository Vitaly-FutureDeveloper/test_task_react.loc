import React from "react"
import styles from "./IndexIconBlock.module.scss"
import {NavLink} from "react-router-dom"

export const IndexIconBlock: React.FC = () => {

	return (
		<NavLink to={"/"}>
			<div className={styles.cardIconBlock}>
			</div>
		</NavLink>
	)
}