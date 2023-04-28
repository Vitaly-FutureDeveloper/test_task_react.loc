import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

import './styles/index.css'


const rootView = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
if (rootView) {
	rootView.render(
		<React.StrictMode>
			<App/>
		</React.StrictMode>
	);
}
