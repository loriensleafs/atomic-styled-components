import React, { Fragment, useCallback, useState } from 'react';
import Box from './../Box';
import Checkbox from './../Checkbox';
import CheckBoxIcon from './../svgIcons/CheckBox';
import CheckboxOutlineBlankIcon from './../svgIcons/CheckBoxOutlineBlank';
import Flex from './../Flex';
import List from './../List';
import ListItem from './../ListItem';
import ListItemText from './../ListItemText';
import Radio from './../Radio';
import RadioButtonUncheckedIcon from './../svgIcons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from './../svgIcons/RadioButtonChecked';
import Switch from './../Switch';
import Typography from './../Typography';
import DemoBox from './DemoBox';

const DemoNavigation = () => (
	<Box minWidth={200} maxWidth={200} style={{ fontSize: '12px' }}>
		<List dense style={{ position: 'sticky', top: 0 }}>
			<ListItem button>
				<ListItemText secondary="Contents" />
			</ListItem>
			<ListItem button>
				<ListItemText secondary="Radio Buttons" />
			</ListItem>
			<ListItem button>
				<ListItemText secondary="Checkboxes" />
			</ListItem>
			<ListItem button>
				<ListItemText secondary="Switches" />
			</ListItem>
			<ListItem button>
				<ListItemText secondary="API" disabled />
			</ListItem>
		</List>
	</Box>
);

const DemoIntro = () => (
	<Fragment>
		<Typography variant="h2" mb={3}>
			Selection Controls
		</Typography>
		<Typography variant="h5" mb={4}>
			Selection controls allow the user to select options.
		</Typography>
		<Typography mb={4}>
			<a href="https://material.io/design/components/selection-controls.html">
				Selection Controls
			</a>{' '}
			allow users to complete tasks that involve making choices such as selecting options, or
			switching settings on or off. Selection controls are found on screens that ask users to
			make decisions or declare preferences such as settings or dialogs.
			<br />
			<br />
			Three types of selection controls are covered in this section:
			<ul>
				<li>
					<b>
						<a href="https://material-ui.com/demos/selection-controls/#radio-buttons">
							Radio Buttons
						</a>
					</b>
					allow the selection of a single option from a set.
				</li>
				<li>
					<b>
						<a href="https://material-ui.com/demos/selection-controls/#checkboxes">
							Checkboxes
						</a>
					</b>
					allow the selection of multiple options from a set.
				</li>
				<li>
					<b>
						<a href="https://material-ui.com/demos/selection-controls/#switches">
							Switches
						</a>
					</b>
					allow a selection to be turned on or off.
				</li>
			</ul>
		</Typography>
	</Fragment>
);

const RadioButtons = () => {
	const [checked, setChecked] = useState('a');

	const handleChange = useCallback(event => setChecked(event.target.value), []);

	return (
		<Fragment>
			<Typography variant="h4" mb={4}>
				Standalone Radio Buttons
			</Typography>
			<Typography mb={3}>
				Radio Buttons can also be used standalone, without the wrapper.
			</Typography>
			<DemoBox>
				<Flex justifyContent="center" alignItems="center">
					<Radio
						checked={checked === 'a'}
						onChange={handleChange}
						value="a"
						name="radio-button-demo"
						aria-label="A"
						color="secondary"
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
			</DemoBox>
		</Fragment>
	);
};

const Checkboxes = () => {
	const [checked, setChecked] = useState({
		A: true,
		B: true,
		F: true,
	});

	const handleChange = useCallback(
		event => setChecked({ ...checked, ...{ [event.target.value]: event.target.checked } }),
		[],
	);

	return (
		<Fragment>
			<Typography variant="h4" mb={4}>
				Checkboxes
			</Typography>
			<Typography mb={3}>
				<a href="https://material.io/design/components/selection-controls.html#checkboxes">
					Checkboxes
				</a>{' '}
				allow the user to select one or more items from a set. Checkboxes can be used to
				turn an option on or off.
				<br />
				<br />
				If you have multiple options appearing in a list, you can preserve space by using
				checkboxes instead of on/off switches. If you have a single option, avoid using a
				checkbox and use an on/off switch instead.
			</Typography>
			<DemoBox>
				<Flex justifyContent="center" alignItems="center">
					<Checkbox checked={checked.A} onChange={handleChange} value="A" />
					<Checkbox
						checked={checked.B}
						onChange={handleChange}
						value="B"
						color="primary"
					/>
					<Checkbox value="C" />
					<Checkbox disabled value="D" />
					<Checkbox disabled checked value="E" />
					<Checkbox checked={checked.F} onChange={handleChange} value="F" indeterminate />
					<Checkbox
						defaultChecked
						color="default"
						value="G"
						icon={<CheckboxOutlineBlankIcon fontSize="20px" />}
						checkedIcon={<CheckBoxIcon fontSize="20px" />}
					/>
				</Flex>
			</DemoBox>
		</Fragment>
	);
};

const Switches = () => {
	const [checked, setChecked] = useState({ A: true, B: true });

	const handleChange = useCallback(
		event => setChecked({ ...checked, ...{ [event.target.value]: event.target.checked } }),
		[],
	);

	return (
		<Fragment>
			<Typography variant="h4" mb={4}>
				Switches
			</Typography>
			<Typography mb={3}>
				<a href="https://material.io/design/components/selection-controls.html#switches">
					Switches
				</a>{' '}
				toggle the state of a single setting on or off. They are the preferred way to adjust
				settings on mobile.
				<br />
				<br />
				The option that the switch controls, as well as the state it’s in, should be made
				clear from the corresponding inline label.
			</Typography>
			<DemoBox>
				<Flex justifyContent="center" alignItems="center">
					<Switch checked={checked.A} onChange={handleChange} value="A" />
					<Switch checked={checked.B} onChange={handleChange} value="B" color="primary" />
					<Switch value="checkedC" />
					<Switch disabled value="checkedD" />
					<Switch disabled checked value="E" />
					<Switch defaultChecked value="F" color="default" />
				</Flex>
			</DemoBox>
		</Fragment>
	);
};

export default () => (
	<Flex w={1}>
		<Box>
			<DemoIntro />
			<RadioButtons />
			<Checkboxes />
			<Switches />
		</Box>
		<DemoNavigation />
	</Flex>
);
