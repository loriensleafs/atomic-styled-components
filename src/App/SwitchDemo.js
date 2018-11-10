import React, { Component } from 'react';
import Box from './../Box';
import Card from './../Card';
import Divider from './../Divider';
import Flex from './../Flex';
import Switch from './../Switch';

class SwitchDemo extends Component {
	state = {
		checkedA: true,
		checkedB: true,
	};

	handleChange = name => checked => {
		this.setState({ [name]: checked });
	};

	render() {
		return (
			<Card my={2}>
				<Box w={1} py={4} px={2}>
					<Flex justifyContent="center" alignItems="center">
						<Switch
							checked={this.state.checkedA}
							onChange={this.handleChange('checkedA')}
							value="checkedA"
						/>
						<Switch
							checked={this.state.checkedB}
							onChange={this.handleChange('checkedB')}
							value="checkedB"
							color="primary"
						/>
						<Switch value="checkedC" />
						<Switch disabled value="checkedD" />
						<Switch disabled checked value="checkedE" />
						<Switch defaultChecked value="checkedF" color="default" />
					</Flex>
				</Box>
			</Card>
		);
	}
}

export default SwitchDemo;
