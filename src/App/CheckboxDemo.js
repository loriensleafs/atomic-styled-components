import React, { Component } from 'react';
import Box from './../Box';
import Card from './../Card';
import Flex from './../Flex';
import Checkbox from './../Checkbox';

class CheckboxDemo extends Component {
	state = {
		checkedA: true,
		checkedB: true,
		checkedF: true,
	};

	handleChange = name => event => {
		this.setState({ [name]: event.target.checked });
	};

	render() {
		return (
			<Card my={2}>
				<Box w={1} py={4} px={2}>
					<Flex justifyContent="center" alignItems="center">
						<Checkbox
							checked={this.state.checkedA}
							onChange={this.handleChange('checkedA')}
							value="checkedA"
						/>
						<Checkbox
							checked={this.state.checkedB}
							onChange={this.handleChange('checkedB')}
							value="checkedB"
							color="primary"
						/>
						<Checkbox value="checkedC" />
						<Checkbox disabled value="checkedD" />
						<Checkbox disabled checked value="checkedE" />
						<Checkbox
							checked={this.state.checkedF}
							onChange={this.handleChange('checkedF')}
							value="checkedF"
							indeterminate
						/>
						<Checkbox defaultChecked color="default" value="checkedG" />
					</Flex>
				</Box>
			</Card>
		);
	}
}

export default CheckboxDemo;
