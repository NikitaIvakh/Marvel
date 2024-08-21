import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/app/App'
import './style/button.scss'
import './style/style.scss'
import './style/variables.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<StrictMode>
		<App />
	</StrictMode>
)
