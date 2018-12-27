import React, { useCallback, useState } from 'react';
import Box from './../Box';
import Card from './../Card';
import Flex from './../Flex';
import Radio from './../Radio';
import RadioButtonUncheckedIcon from './../svgIcons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from './../svgIcons/RadioButtonChecked';

function RadioDemo(props) {
	const [checked, setChecked] = useState('a');

	const handleChange = useCallback(
		event => setChecked(event.target.value),
		[],
	);

	return (
		<Card my={2}>
			<Box w={1} py={4} px={2}>
				<Flex justifyContent="center" alignItems="center">
					<Radio
						checked={checked === 'a'}
						onChange={handleChange}
						value="a"
						name="radio-button-demo"
						aria-label="A"
					/>
					<Radio
						checked={checked === 'b'}
						onChange={handleChange}
						value="b"
						name="radio-button-demo"
						aria-label="B"
						color="primary"
					/>
					<Radio
						checked={checked === 'c'}
						onChange={handleChange}
						value="c"
						name="radio-button-demo"
						aria-label="C"
					/>
					<Radio
						checked={checked === 'd'}
						onChange={handleChange}
						value="d"
						color="default"
						name="radio-button-demo"
						aria-label="D"
					/>
					<Radio
						checked={checked === 'e'}
						onChange={handleChange}
						value="e"
						color="default"
						name="radio-button-demo"
						aria-label="E"
						icon={<RadioButtonUncheckedIcon fontSize="20px" />}
						checkedIcon={<RadioButtonCheckedIcon fontSize="20px" />}
					/>
				</Flex>
			</Box>
		</Card>
	);
}

export default RadioDemo;
