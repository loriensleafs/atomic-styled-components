import React, { Component } from 'react';

class ErrorBoundry extends Component {
	state = {
		hasError: false,
		error: null,
		info: null,
	};

	componentDidCatch(error, info) {
		// Display fallback UI
		this.setState({ hasError: true, error, info });
		// You can also log the error to an error reporting service
		// logErrorToMyService(error, info)
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return (
				<>
					<h1>Something went wrong.</h1>
					<p>
						<b>Error: </b>
						{this.state.error}
					</p>
					<p>
						<b>Info: </b>
						{this.state.info}
					</p>
				</>
			);
		}
		return this.props.children;
	}
}

ErrorBoundry.displayName = 'ErrorBoundry';

export default ErrorBoundry;
