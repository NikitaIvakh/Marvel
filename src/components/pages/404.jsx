import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import PageError from '../errors/PageError'
import './page404.scss'

const Page404 = () => {
	return (
		<div>
			<HelmetProvider>
				<Helmet>
					<meta name='description' content='This page was not found.' />
					<title>This page was not found.</title>
				</Helmet>
			</HelmetProvider>
			<div className='error'>
				<div className='error__wrapper'>
					<div className='error__descr'>
						<h2 className='error__header'>404 Page Not Found</h2>
						<div className='error__header__title'>
							HYDRA has stolen this page from the S.H.I.E.L.D. database!
						</div>
						<div className='error__text'>
							Check that you typed the address correctly, go back to your
							previous <br /> page or try using our site search to find
							something specific.
						</div>
					</div>
					<div className='error__img'>
						<PageError />
					</div>
				</div>
			</div>
			<Link className='link-style' to='/'>
				Back to main page
			</Link>
		</div>
	)
}
export default Page404
