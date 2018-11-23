import React, { useCallback, useState } from 'react';
import Box from './../Box';
import Card from './../Card';
import Flex from './../Flex';
import Switch from './../Switch';

function SwitchDemo(props) {
	const [checked, setChecked] = useState({ A: true, B: true });

	const handleChange = useCallback(
		event => setChecked({ ...checked, ...{ [event.target.value]: event.target.checked } }),
		[],
	);

	return (
		<Card my={2}>
			<Box w={1} py={4} px={2}>
				<Flex justifyContent="center" alignItems="center">
					<Switch checked={checked.A} onChange={handleChange} value="A" />
					<Switch checked={checked.B} onChange={handleChange} value="B" color="primary" />
					<Switch value="checkedC" />
					<Switch disabled value="checkedD" />
					<Switch disabled checked value="E" />
					<Switch defaultChecked value="F" color="default" />
				</Flex>
			</Box>
		</Card>
	);
}

export default SwitchDemo;
