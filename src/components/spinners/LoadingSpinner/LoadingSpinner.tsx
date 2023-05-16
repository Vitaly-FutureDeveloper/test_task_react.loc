import React, {useEffect} from "react"
import styles from "./LoadingSpinner.module.scss"

const LoadingSpinner: React.FC = () => {
	useEffect(() => {
		console.log(111111)
	})
	return <div className={styles.lds_ellipsis}>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
	</div>
}

export default LoadingSpinner