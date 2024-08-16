import errorGif from './error.gif'

const CharInfoError = () => {
	const btnStyle = {
		pointerEvents: 'none',
		opacity: 0.5,
		cursor: 'not-allowed',
	}

	return (
		<>
			<div className='char__basics'>
				<img src={errorGif} alt='abyss' />
				<div>
					<div className='char__info-name'>NOT FOUND</div>
					<div className='char__btns'>
						<a href='##' className='button button__main' style={btnStyle}>
							<div className='inner'>NOT FOUND</div>
						</a>
						<a href='##' className='button button__secondary' style={btnStyle}>
							<div className='inner'>NOT FOUND</div>
						</a>
					</div>
				</div>
			</div>
			<div className='char__descr'>CHARACTER NOT FOUND</div>
			<div className='char__comics'>Comics:</div>
			<ul className='char__comics-list'>
				<li className='char__comics-item'>
					There is no such error in any comic book.
				</li>
			</ul>
		</>
	)
}

export default CharInfoError
