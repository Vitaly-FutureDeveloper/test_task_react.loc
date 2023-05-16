import React, {useEffect} from 'react'
import {HashRouter, Navigate, Route, Routes} from "react-router-dom"
import {Provider, useDispatch} from "react-redux"
import store from "./redux/store"
import LoadingSpinner from './components/spinners/LoadingSpinner/LoadingSpinner'
import CardIconBlock from "./components/simples/CardIconBlock/CardIconBlock";
import {initialCardTC} from "./redux/card-reducer/card-reducer";
import {IndexIconBlock} from "./components/simples/IndexIconBlock/IndexIconBlock";

const ProductList = React.lazy(() => import("./components/ProductList/ProductList"))
const ProductObject = React.lazy(() => import("./components/ProductObject/ProductObject"))
const ProductCard = React.lazy(() => import("./components/Card/Card"))


export default function App() {


	return (
		<HashRouter>
			<Provider store={store}>
				<React.Suspense fallback={<LoadingSpinner/>}>
					<RootApp/>
				</React.Suspense>
			</Provider>
		</HashRouter>
	)
}

const RootApp = () => {
	const dispatch = useDispatch<any>()

	useEffect(() => {
		dispatch(initialCardTC());
	}, [])

	return (
		<div className="App">
			<div className="App-wrapper">
				<header className="App-header">
					<p>Hello there! It's my test task for your company A-Z Academy. Author Vitaliy Future Developer</p>
				</header>
				<main className="page-main">
					<h1 className="visually-hidden">Тестовое задание для компании А-Я Академия</h1>
					<div className="logo-block">
						<IndexIconBlock/>
						<CardIconBlock/>
					</div>

					<Routes>
						<Route path='/list' element={<ProductList/>}/>
						<Route path='/object' element={<ProductObject/>}/>
						<Route path='/card' element={<ProductCard/>}/>
						<Route path="/" element={<Navigate replace to="/list"/>}/>
					</Routes>
				</main>
			</div>
		</div>
	)
}
