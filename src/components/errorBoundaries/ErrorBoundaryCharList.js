import { Component } from 'react'
import ErrorMessage from '../errorMessage/ErrorMessage'

class ErrorBoundaryCharList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			error: false,
		}
	}

	componentDidCatch() {
		this.setState({ error: true })
	}

	render() {
		if (this.state.error) return <ErrorMessage />
		return this.props.children
	}
}

export default ErrorBoundaryCharList
