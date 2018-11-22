import React, { Component } from 'react';
import Box from './../Box';
import Card from './../Card';
import Flex from './../Flex';
import Checkbox from './../Checkbox';
import CheckBoxIcon from './../svgIcons/CheckBox';
import CheckboxOutlineBlankIcon from './../svgIcons/CheckBoxOutlineBlank';

class CheckboxDemo extends Component {
	state = {
		checkedA: true,
		checkedB: true,
		checkedF: true,
	};

	handleChange = name => (event, checked) => {
		this.setState({ [name]: checked });
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
						<Checkbox
							defaultChecked
							color="default"
							value="checkedG"
							icon={<CheckboxOutlineBlankIcon fontSize="20px" />}
							checkedIcon={<CheckBoxIcon fontSize="20px" />}
						/>
					</Flex>
				</Box>
			</Card>
		);
	}
}

export default CheckboxDemo;
