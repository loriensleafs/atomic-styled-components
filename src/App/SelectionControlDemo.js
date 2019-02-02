import React, { Fragment, useCallback, useReducer, useState } from 'react';
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
import DemoBox from './DemoBox';
import { PageHeader, SectionHeader, Paragraph } from './DemoTypography';

const Navigation = () => (
	<Box
		w={200}
		pt={5}
		display={['none', null, null, null, 'block']}
		fontSize="12px"
	>
		<List dense style={{ position: 'sticky', top: '64px' }}>
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

const Intro = () => (
	<Fragment>
		<PageHeader>Selection Controls</PageHeader>
		<SectionHeader>
			Selection controls allow the user to select options.
		</SectionHeader>
		<Paragraph mb={0}>
			<a href="https://material.io/design/components/selection-controls.html">
				Selection Controls
			</a>{' '}
			allow users to complete tasks that involve making choices such as
			selecting options, or switching settings on or off. Selection
			controls are found on screens that ask users to make decisions or
			declare preferences such as settings or dialogs.
			<br />
			<br />
			Three types of selection controls are covered in this section:
		</Paragraph>
		<Box as="ul" px={[3.5, 4, 5]}>
			<li>
				<Paragraph mb={0} px={0}>
					<b>
						<a href="https://material-ui.com/demos/selection-controls/#radio-buttons">
							Radio Buttons
						</a>
					</b>
					allow the selection of a single option from a set.
				</Paragraph>
			</li>
			<li>
				<Paragraph mb={0} px={0}>
					<b>
						<a href="https://material-ui.com/demos/selection-controls/#checkboxes">
							Checkboxes
						</a>
					</b>
					allow the selection of multiple options from a set.
				</Paragraph>
			</li>
			<li>
				<Paragraph mb={0} px={0}>
					<b>
						<a href="https://material-ui.com/demos/selection-controls/#switches">
							Switches
						</a>
					</b>
					allow a selection to be turned on or off.
				</Paragraph>
			</li>
		</Box>
	</Fragment>
);

function radioReducer(state, selected) {
	switch (['a', 'b', 'c', 'd', 'e'].includes(selected)) {
		case true:
			return { ...state, [selected]: true };
		default:
			return state;
	}
}
const RadioButtons = () => {
	const [isChecked, dispatch] = useReducer(radioReducer, {
		a: true,
		b: false,
		c: false,
		d: false,
		e: false,
	});

	const handleChange = useCallback(event => {
		dispatch(event.target.value);
	}, []);

	return (
		<Fragment>
			<SectionHeader>Standalone Radio Buttons</SectionHeader>
			<Paragraph>
				Radio Buttons can also be used standalone, without the wrapper.
			</Paragraph>
			<DemoBox>
				<Flex
					justifyContent="flex-start"
					alignItems="center"
					wrap="wrap"
				>
					<Radio
						checked={isChecked.a}
						onChange={handleChange}
						value="a"
						name="radio-button-demo"
						aria-label="A"
						color="secondary"
					/>
					<Radio
						checked={isChecked.b}
						onChange={handleChange}
						value="b"
						name="radio-button-demo"
						aria-label="B"
						color="primary"
					/>
					<Radio
						checked={isChecked.c}
						onChange={handleChange}
						value="c"
						name="radio-button-demo"
						aria-label="C"
					/>
					<Radio
						checked={isChecked.d}
						onChange={handleChange}
						value="d"
						color="default"
						name="radio-button-demo"
						aria-label="D"
					/>
					<Radio
						checked={isChecked.e}
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
	const [checked, setChecked] = useState({ a: true, b: true, f: true });

	const handleChange = useCallback(
		(event, isChecked) =>
			setChecked(state => ({
				...state,
				[event.target.value]: isChecked,
			})),
		[],
	);

	return (
		<Fragment>
			<SectionHeader>Checkboxes</SectionHeader>
			<Paragraph>
				<a href="https://material.io/design/components/selection-controls.html#checkboxes">
					Checkboxes
				</a>{' '}
				allow the user to select one or more items from a set.
				Checkboxes can be used to turn an option on or off.
				<br />
				<br />
				If you have multiple options appearing in a list, you can
				preserve space by using checkboxes instead of on/off switches.
				If you have a single option, avoid using a checkbox and use an
				on/off switch instead.
			</Paragraph>
			<DemoBox>
				<Flex
					justifyContent="flex-start"
					alignItems="center"
					wrap="wrap"
				>
					<Checkbox
						checked={checked.a}
						onChange={handleChange}
						value="a"
					/>
					<Checkbox
						checked={checked.b}
						onChange={handleChange}
						value="b"
						color="primary"
					/>
					<Checkbox value="c" />
					<Checkbox disabled value="d" />
					<Checkbox disabled checked value="e" />
					<Checkbox
						checked={checked.f}
						onChange={handleChange}
						value="f"
						indeterminate
					/>
					<Checkbox
						defaultChecked
						color="default"
						value="g"
						icon={<CheckboxOutlineBlankIcon fontSize="20px" />}
						checkedIcon={<CheckBoxIcon fontSize="20px" />}
					/>
				</Flex>
			</DemoBox>
		</Fragment>
	);
};

const Switches = () => {
	const [{ a, b }, setChecked] = useState({ a: true, b: true });

	const handleChange = useCallback((event, isChecked) => {
		const next = { [event.target.value]: isChecked };
		setChecked(state => ({ ...state, ...next }));
	}, []);

	return (
		<Fragment>
			<SectionHeader>Switches</SectionHeader>
			<Paragraph>
				<a href="https://material.io/design/components/selection-controls.html#switches">
					Switches
				</a>{' '}
				toggle the state of a single setting on or off. They are the
				preferred way to adjust settings on mobile.
				<br />
				<br />
				The option that the switch controls, as well as the state it’s
				in, should be made clear from the corresponding inline label.
			</Paragraph>
			<DemoBox>
				<Flex
					justifyContent="flex-start"
					alignItems="center"
					wrap="wrap"
				>
					<Switch checked={a} onChange={handleChange} value="a" />
					<Switch
						checked={b}
						onChange={handleChange}
						value="b"
						color="primary"
					/>
					<Switch value="c" />
					<Switch disabled value="d" />
					<Switch disabled checked value="e" />
					<Switch defaultChecked value="f" color="default" />
				</Flex>
			</DemoBox>
		</Fragment>
	);
};

export default () => (
	<Flex w={1}>
		<Box w={1} mt={5.5}>
			<Intro />
			<RadioButtons />
			<Checkboxes />
			<Switches />
		</Box>
		<Navigation />
	</Flex>
);
