import React, { Component } from 'react';
import Box from './../Box';
import Card from './../Card';
import Flex from './../Flex';
import Radio from './../Radio';
import RadioButtonUncheckedIcon from './../svgIcons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from './../svgIcons/RadioButtonChecked';

class RadioDemo extends Component {
	state = {
		selectedValue: 'a',
	};

	handleChange = event => {
		this.setState({ selectedValue: event.target.value });
	};

	render() {
		const { classes } = this.props;

		return (
			<Card my={2}>
				<Box w={1} py={4} px={2}>
					<Flex justifyContent="center" alignItems="center">
						<Radio
							checked={this.state.selectedValue === 'a'}
							onChange={this.handleChange}
							value="a"
							name="radio-button-demo"
							aria-label="A"
						/>
						<Radio
							checked={this.state.selectedValue === 'b'}
							onChange={this.handleChange}
							value="b"
							name="radio-button-demo"
							aria-label="B"
							color="primary"
						/>
						<Radio
							checked={this.state.selectedValue === 'c'}
							onChange={this.handleChange}
							value="c"
							name="radio-button-demo"
							aria-label="C"
						/>
						<Radio
							checked={this.state.selectedValue === 'd'}
							onChange={this.handleChange}
							value="d"
							color="default"
							name="radio-button-demo"
							aria-label="D"
						/>
						<Radio
							checked={this.state.selectedValue === 'e'}
							onChange={this.handleChange}
							value="e"
							color="default"
							name="radio-button-demo"
							aria-label="E"
							icon={<RadioButtonUncheckedIcon fontSize="small" />}
							checkedIcon={<RadioButtonCheckedIcon fontSize="small" />}
						/>
					</Flex>
				</Box>
			</Card>
		);
	}
}

export default RadioDemo;
