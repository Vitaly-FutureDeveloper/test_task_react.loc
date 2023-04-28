import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import styles from "./ProductObject.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {actions, initialProductObjectTC} from "../../redux/object-reducer/object-reducer";
import {getObjectInitialized, getObjectProduct, getSizeSelect} from "../../redux/object-reducer/object-selectors";
import LoadingSpinner from "../spinners/LoadingSpinner/LoadingSpinner";
import {setProductCardTC} from "../../redux/card-reducer/card-reducer";

export const ProductObject: React.FC = () => {
	const dispatch = useDispatch<any>()
	const [searchParams] = useSearchParams()

	const [colors, setColors] = useState()
	const [sizes, setSizes] = useState()
	const [currentColor, setCurrentColor] = useState<any>()
	const [currentColorIndex, setCurrentColorIndex] = useState<any>(0)
	const [currentSize, setCurrentSize] = useState<any>()

	//Slider
	const translateStep = 250;
	const [sliderTranslate, setSliderTranslate] = useState(0);
	const [sliderCounter, setSliderCounter] = useState(1);

	const onSliderPlus = () => {
		if(sliderTranslate >= ((productObject?.colors[currentColorIndex]?.images.length -1) * translateStep)){
			return;
		}
		setSliderTranslate(sliderTranslate + translateStep);
		setSliderCounter(sliderCounter + 1);
	};

	const onSliderMinus = () => {
		if(sliderTranslate === 0){
			return;
		}
		setSliderTranslate(sliderTranslate - translateStep)
		setSliderCounter(sliderCounter - 1);
	};
	//Slider

	const productObject = useSelector(getObjectProduct)
	const sizeSelect = useSelector(getSizeSelect)

	const initialPage = useSelector(getObjectInitialized)

	useEffect(() => {
		const idParam = Number(searchParams.get('id'));

		dispatch(initialProductObjectTC(idParam))

		return () => dispatch(actions.clearProductObject())
	}, [])


	useEffect(() => {
		const colorsFromProducts = productObject?.colors.map((color) => ({id: color.id, name: color.name}))
		const indexColorFind = productObject?.colors?.findIndex((color) => color.id == currentColor);

		setColors(colorsFromProducts)
		setCurrentColorIndex(indexColorFind)
		colorsFromProducts && setCurrentColor(colorsFromProducts[0]?.id)

		return () => {
			setColors(null)
		}
	}, [productObject, sizeSelect])

	useEffect(() => {
		const indexColorFind = productObject?.colors?.findIndex((color) => color.id == currentColor);
		const sizesFromProducts = sizeSelect?.filter((size) => productObject?.colors[currentColorIndex]?.sizes.includes(size.id));

		setSizes(sizesFromProducts)
		setCurrentColorIndex(indexColorFind)

		return () => {
			setSizes(null)
		}
	}, [currentColor, productObject, sizeSelect, currentColorIndex])



	const handleColorChange = (evt) => {
		setCurrentColor(evt.target.value)
	}

	const handleSizeChange = (evt) => {
		setCurrentSize(evt.target.value)
	}

	const setToCard = () => {
		dispatch( setProductCardTC(productObject.id, colors[currentColorIndex].id, currentSize) )
	}

	return (
		!initialPage ?
			<LoadingSpinner/>

			:

			<section className={styles.productObjectSection}>

				<div className={styles.sliderBlock}>
					<button className={styles.btn_prev} onClick={onSliderMinus}>Назад</button>
					<button className={styles.btn_next} onClick={onSliderPlus}>Вперёд</button>
					<div className={styles.imageBlock} style={{ transform: `translateX(${-sliderTranslate}px)`}}>
						{
							productObject?.colors[currentColorIndex]?.images?.map((image, i) => <img key={image} src={image} alt=""/>)
						}
					</div>
				</div>

				<div className={styles.productObjectChanger}>
					<label>Цвет:
						<select name="color" value={currentColor} onChange={handleColorChange}>
							{
								colors?.map((color) => <option key={color.id} value={color.id}>{color.name}</option>)
							}
						</select>
					</label>

					<label>Размер:
						<select name="size" value={currentSize} onChange={handleSizeChange}>
							{
								sizes?.map((select) => <option key={select.id} value={select.id}>{select.label}</option> )
							}
						</select>
					</label>
				</div>

				<div>
					<button onClick={setToCard}>В корзину</button>
				</div>


			</section>
	)
};

export default ProductObject;