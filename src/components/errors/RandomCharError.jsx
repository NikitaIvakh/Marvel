import errorGif from './error.gif'

const RandomCharError = () => {
	const btnActiveStyle = {
		pointerEvents: 'none',
		opacity: 0.5,
		cursor: 'not-allowed',
	}

	return (
		<div className='randomchar__block'>
			<img src={errorGif} alt='Random character' className='randomchar__img' />
			<div className='randomchar__info'>
				<p className='randomchar__name'>NOT FOUND</p>
				<p className='randomchar__descr'>CHARACTER NOT FOUND</p>
				<div className='randomchar__btns'>
					<a href='##' className='button button__main' style={btnActiveStyle}>
						<div className='inner'>NOT FOUND</div>
					</a>
					<a
						href='##'
						className='button button__secondary'
						style={btnActiveStyle}
					>
						<div className='inner'>NOT FOUND</div>
					</a>
				</div>
			</div>
		</div>
	)
}

export default RandomCharError
