import React, { useCallback, useState } from 'react';
import Box from './../Box';
import Card from './../Card';
import Flex from './../Flex';
import Checkbox from './../Checkbox';
import CheckBoxIcon from './../svgIcons/CheckBox';
import CheckboxOutlineBlankIcon from './../svgIcons/CheckBoxOutlineBlank';

function CheckboxDemo(props) {
	const [checked, setChecked] = useState({
		A: true,
		B: true,
		F: true,
	});

	const handleChange = useCallback(
		event =>
			setChecked({
				...checked,
				...{ [event.target.value]: event.target.checked },
			}),
		[],
	);

	return (
		<Card my={2}>
			<Box w={1} py={4} px={2}>
				<Flex justifyContent="center" alignItems="center">
					<Checkbox
						checked={checked.A}
						onChange={handleChange}
						value="A"
					/>
					<Checkbox
						checked={checked.B}
						onChange={handleChange}
						value="B"
						color="primary"
					/>
					<Checkbox value="C" />
					<Checkbox disabled value="D" />
					<Checkbox disabled checked value="E" />
					<Checkbox
						checked={checked.F}
						onChange={handleChange}
						value="F"
						indeterminate
					/>
					<Checkbox
						defaultChecked
						color="default"
						value="G"
						icon={<CheckboxOutlineBlankIcon fontSize="20px" />}
						checkedIcon={<CheckBoxIcon fontSize="20px" />}
					/>
				</Flex>
			</Box>
		</Card>
	);
}

export default CheckboxDemo;
