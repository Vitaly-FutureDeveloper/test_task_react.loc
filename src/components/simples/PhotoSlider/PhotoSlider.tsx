import React, {useState} from "react"
import styles from "./PhotoSlider.module.scss"
import {NavLink} from "react-router-dom"

interface PropsType {
	images: Array<any>
}
export const PhotoSlider: React.FC<PropsType> = ({images}) => {

	const translateStep = 250
	const [sliderTranslate, setSliderTranslate] = useState(0)
	const [sliderCounter, setSliderCounter] = useState(1)

	const onSliderPlus = () => {
		if (sliderTranslate >= ((images.length - 1) * translateStep)) {
			return;
		}
		setSliderTranslate(sliderTranslate + translateStep)
		setSliderCounter(sliderCounter + 1)
	};

	const onSliderMinus = () => {
		if (sliderTranslate === 0) {
			return;
		}
		setSliderTranslate(sliderTranslate - translateStep)
		setSliderCounter(sliderCounter - 1)
	};


	return (
		<div className={styles.sliderBlock}>
			<button className={styles.btn_prev} onClick={onSliderMinus}>Назад</button>
			<button className={styles.btn_next} onClick={onSliderPlus}>Вперёд</button>
			<div className={styles.imageBlock} style={{transform: `translateX(${-sliderTranslate}px)`}}>
				{
					images.map((image) => <img key={image} src={image} alt=""/>)
				}
			</div>
		</div>
	)
}

export default React.memo(PhotoSlider)