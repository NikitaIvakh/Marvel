import { lazy, Suspense, useRef } from 'react'
import {
	Route,
	BrowserRouter as Router,
	Routes,
	useLocation,
} from 'react-router-dom'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import AppHeader from '../appHeader/AppHeader'
import SinglePage from '../pages/SinglePage'
import Spinner from '../spinner/Spinner'
import './app.scss'

const Page404 = lazy(() => import('../pages/404'))
const MainPage = lazy(() => import('../pages/MainPage'))
const ComicsPage = lazy(() => import('../pages/ComicsPage'))
const SingleComicLayout = lazy(() =>
	import('../pages/SingleComicLayout/SingleComicLayout')
)
const SingleCharacterLayout = lazy(() =>
	import('../pages/SingleCharacterLayout/SingleCharacterLayout')
)

const AnimatedRoutes = () => {
	const location = useLocation()
	const nodeRef = useRef(null)
	const duration = 300

	return (
		<SwitchTransition>
			<CSSTransition
				key={location.pathname}
				timeout={duration}
				classNames='fade'
				unmountOnExit
				nodeRef={nodeRef}
			>
				<div ref={nodeRef}>
					<Routes location={location}>
						<Route path='/' element={<MainPage />} />
						<Route
							path='/characters/:id'
							element={
								<SinglePage
									Component={SingleCharacterLayout}
									datatype='character'
								/>
							}
						/>
						<Route
							path='/comics/:id'
							element={
								<SinglePage Component={SingleComicLayout} datatype='comic' />
							}
						/>
						<Route path='/comics' element={<ComicsPage />} />
						<Route path='/comics/:id' element={<SingleComicLayout />} />
						<Route path='*' element={<Page404 />} />
					</Routes>
				</div>
			</CSSTransition>
		</SwitchTransition>
	)
}

const App = () => {
	return (
		<Router>
			<div className='app'>
				<AppHeader />
				<main>
					<Suspense fallback={<Spinner />}>
						<AnimatedRoutes />
					</Suspense>
				</main>
			</div>
		</Router>
	)
}

export default App
