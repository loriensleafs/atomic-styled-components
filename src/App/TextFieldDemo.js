import React, { useRef, useState } from 'react';
import Box from './../Box';
import FilledInput from './../FilledInput';
import Flex from './../Flex';
import FormControl from './../FormControl';
import FormHelperText from './../FormHelperText';
import IconButton from './../IconButton';
import Input from './../Input';
import InputAdornment from './../InputAdornment';
import InputLabel from './../InputLabel';
import List from './../List';
import ListItem from './../ListItem';
import ListItemText from './../ListItemText';
import OutlinedInput from './../OutlinedInput';
import { getSpacing, useStyles } from './../system';
import TextField from './../TextField';
import Demo from './Demo';
import { Header, Paragraph, Title } from './typography';
import { VisibilityIcon, VisibilityOffIcon } from './icons';

const Navigation = () => (
	<Box w={200} display={['none', null, null, null, 'block']} fontSize="12px">
		<List dense style={{ position: 'sticky', top: '64px' }}>
			<ListItem button>
				<ListItemText secondary="Contents" />
			</ListItem>
			<ListItem button>
				<ListItemText secondary="TextField" />
			</ListItem>
			<ListItem button>
				<ListItemText secondary="Outlined" />
			</ListItem>
			<ListItem button>
				<ListItemText secondary="Filled" />
			</ListItem>
			<ListItem button>
				<ListItemText secondary="Components" />
			</ListItem>
			<ListItem button>
				<ListItemText secondary="Inputs" />
			</ListItem>
			<ListItem button>
				<ListItemText secondary="Customized Inputs" />
			</ListItem>
			<ListItem button>
				<ListItemText secondary="Input Adornments" />
			</ListItem>
			<ListItem button>
				<ListItemText secondary="Layout" />
			</ListItem>
			<ListItem button>
				<ListItemText secondary="Limitations" />
			</ListItem>
			<ListItem button>
				<ListItemText secondary="Formatted inputs" />
			</ListItem>
			<ListItem button>
				<ListItemText secondary="Accessibility" />
			</ListItem>
			<ListItem button>
				<ListItemText secondary="API" />
			</ListItem>
		</List>
	</Box>
);

const Intro = () => (
	<>
		<Header>Text Fields</Header>
		<Title>Text fields let users enter and edit text.</Title>
		<Paragraph as="div">
			<a href="https://material.io/design/components/text-fields.html">
				Text fields
			</a>{' '}
			allow users to enter text into a UI. They typically appear in forms
			and dialogs.
		</Paragraph>
	</>
);

const getTextFieldDemoStyles = () => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	dense: {
		marginTop: '19px',
	},
	input: getSpacing({ m: 1 }),
	formControl: getSpacing({ m: 2 }),
	textField: {
		...getSpacing({ ml: 2, mr: 2 }),
		width: '200px',
	},
});

const TextFields = ({ title, description, variant }) => {
	const [age, setAge] = useState('');
	const [name, setName] = useState('Cat in the Hat');
	const [multiline, setMultiline] = useState('Controlled');
	const { classes, styles } = useStyles(null, getTextFieldDemoStyles, {
		nested: true,
	});

	return (
		<>
			{title}
			{description}
			<Demo>
				<form
					className={classes.container}
					noValidate
					autoComplete="off"
				>
					<TextField
						id="standard-name"
						label="Name"
						FormControlProps={{
							styles: styles.textField,
						}}
						value={name}
						onChange={event => setName(event.target.value)}
						margin="normal"
						placeholder="testing"
						variant={variant}
					/>
					<TextField
						id="standard-uncontrolled"
						label="Uncontrolled"
						defaultValue="foo"
						FormControlProps={{
							styles: styles.textField,
						}}
						margin="normal"
						variant={variant}
					/>
					<TextField
						required
						id="standard-required"
						label="Required"
						defaultValue="Hello World"
						FormControlProps={{
							styles: styles.textField,
						}}
						margin="normal"
						variant={variant}
					/>
					<TextField
						error
						id="standard-error"
						label="Error"
						defaultValue="Hello World"
						FormControlProps={{
							styles: styles.textField,
						}}
						margin="normal"
						variant={variant}
					/>
					<TextField
						disabled
						id="standard-disabled"
						label="Disabled"
						defaultValue="Hello World"
						FormControlProps={{
							styles: styles.textField,
						}}
						margin="normal"
						variant={variant}
					/>
					<TextField
						id="standard-password-input"
						label="Password"
						FormControlProps={{
							styles: styles.textField,
						}}
						type="password"
						autoComplete="current-password"
						margin="normal"
						variant={variant}
					/>
					<TextField
						id="standard-read-only-input"
						label="Read Only"
						defaultValue="Hello World"
						FormControlProps={{
							styles: styles.textField,
						}}
						margin="normal"
						InputProps={{
							readOnly: true,
						}}
						variant={variant}
					/>
					<TextField
						id="standard-dense"
						label="Dense"
						FormControlProps={{
							styles: { ...styles.textField, ...styles.dense },
						}}
						margin="dense"
						variant={variant}
					/>
					<TextField
						id="standard-multiline-flexible"
						label="Multiline"
						multiline
						rowsMax="4"
						value={multiline}
						onChange={event => setMultiline(event.target.value)}
						FormControlProps={{
							styles: styles.textField,
						}}
						margin="normal"
						variant={variant}
					/>
					<TextField
						id="standard-multiline-static"
						label="Multiline"
						multiline
						rows="4"
						defaultValue="Default Value"
						FormControlProps={{
							styles: styles.textField,
						}}
						margin="normal"
						variant={variant}
					/>
					<TextField
						id="standard-helperText"
						label="Helper text"
						defaultValue="Default Value"
						FormControlProps={{
							styles: styles.textField,
						}}
						helperText="Some important text"
						margin="normal"
						variant={variant}
					/>
					<TextField
						id="standard-with-placeholder"
						label="With placeholder"
						placeholder="Placeholder"
						FormControlProps={{
							styles: styles.textField,
						}}
						margin="normal"
						variant={variant}
					/>

					<TextField
						id="standard-textarea"
						label="With placeholder multiline"
						placeholder="Placeholder"
						multiline
						FormControlProps={{
							styles: styles.textField,
						}}
						margin="normal"
						variant={variant}
					/>
					<TextField
						id="standard-number"
						label="Number"
						value={age}
						onChange={event => setAge(event.target.value)}
						type="number"
						FormControlProps={{
							styles: styles.textField,
						}}
						InputLabelProps={{
							shrink: true,
						}}
						margin="normal"
						variant={variant}
					/>
					<TextField
						id="standard-search"
						label="Search field"
						type="search"
						FormControlProps={{
							styles: styles.textField,
						}}
						margin="normal"
						variant={variant}
					/>
					<TextField
						id="standard-full-width"
						label="Label"
						style={{ margin: '8px' }}
						placeholder="Placeholder"
						helperText="Full width!"
						fullWidth
						margin="normal"
						InputLabelProps={{
							shrink: true,
						}}
						variant={variant}
					/>
					<TextField
						id="standard-bare"
						defaultValue="Bare"
						margin="normal"
						variant={variant}
					/>
				</form>
			</Demo>
		</>
	);
};

const Inputs = () => {
	const labelRef = useRef(null);
	const [value, setValue] = useState('Composed TextField');
	const { styles } = useStyles(null, getTextFieldDemoStyles, {
		nested: true,
	});

	const handleChange = event => setValue(event.target.value);

	return (
		<>
			<Title>Inputs</Title>
			<Demo>
				<Flex wrap="wrap">
					<FormControl styles={styles.formControl}>
						<InputLabel htmlFor="component-simple">Name</InputLabel>
						<Input
							id="component-simple"
							value={value}
							onChange={handleChange}
						/>
					</FormControl>
					<FormControl styles={styles.formControl}>
						<InputLabel htmlFor="component-helper">Name</InputLabel>
						<Input
							id="component-helper"
							value={value}
							onChange={handleChange}
							aria-describedby="component-helper-text"
						/>

						<FormHelperText id="component-helper-text">
							Some important helper text
						</FormHelperText>
					</FormControl>
					<FormControl styles={styles.formControl} disabled>
						<InputLabel htmlFor="component-disabled">
							Name
						</InputLabel>
						<Input
							id="component-disabled"
							value={value}
							onChange={handleChange}
						/>
						<FormHelperText>Disabled</FormHelperText>
					</FormControl>
					<FormControl styles={styles.formControl} error>
						<InputLabel htmlFor="component-error">Name</InputLabel>
						<Input
							id="component-error"
							value={value}
							onChange={handleChange}
							aria-describedby="component-error-text"
						/>

						<FormHelperText id="component-error-text">
							Error
						</FormHelperText>
					</FormControl>
					<FormControl
						filled
						styles={styles.formControl}
						variant="outlined"
					>
						<InputLabel ref={labelRef} htmlFor="component-outlined">
							Name
						</InputLabel>
						<OutlinedInput
							id="component-outlined"
							value={value}
							onChange={handleChange}
							labelWidth={
								labelRef.current
									? labelRef.current.offsetWidth
									: 0
							}
						/>
					</FormControl>
					<FormControl
						filled
						styles={styles.formControl}
						variant="filled"
					>
						<InputLabel htmlFor="component-filled">Name</InputLabel>
						<FilledInput
							id="component-filled"
							value={value}
							onChange={handleChange}
						/>
					</FormControl>
				</Flex>
			</Demo>
		</>
	);
};

const getInputAdornmentDemoStyles = () => ({
	margin: getSpacing({ mt: 2, mr: 2, mb: 2, ml: 2 }),
	withoutLabel: getSpacing({ mt: 4 }),
	textField: {
		flexBasis: 200,
	},
});

const InputAdornments = () => {
	const [amount, setAmount] = useState('');
	const [weight, setWeight] = useState('');
	const [weightRange, setWeightRange] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const { classes, styles } = useStyles(null, getInputAdornmentDemoStyles, {
		nested: true,
	});

	return (
		<>
			<Title>Input Adornments</Title>
			<Paragraph>
				Input allows the provision of InputAdornment. These can be used
				to add a prefix, a suffix or an action to an input. For
				instance, you can use and icon button to hide or reveal the
				password.
			</Paragraph>
			<Demo>
				<Flex wrap="wrap">
					<TextField
						label="With normal TextField"
						id="simple-start-adornment"
						FormControlProps={{
							styles: { ...styles.margin, ...styles.textField },
						}}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									Kg
								</InputAdornment>
							),
						}}
					/>
					<FormControl fullWidth styles={styles.margin}>
						<InputLabel htmlFor="adornment-amount">
							Amount
						</InputLabel>
						<Input
							id="adornment-amount"
							value={amount}
							onChange={event => setAmount(event.target.value)}
							startAdornment={
								<InputAdornment position="start">
									$
								</InputAdornment>
							}
						/>
					</FormControl>
					<FormControl
						styles={{
							...styles.margin,
							...styles.textField,
						}}
					>
						<Input
							id="adornment-weight"
							value={weight}
							onChange={event => setWeight(event.target.value)}
							aria-describedby="weight-helper-text"
							endAdornment={
								<InputAdornment position="end">
									Kg
								</InputAdornment>
							}
							inputProps={{
								'aria-label': 'Weight',
							}}
						/>

						<FormHelperText id="weight-helper-text">
							Weight
						</FormHelperText>
					</FormControl>
					<FormControl
						styles={{ ...styles.margin, ...styles.textField }}
					>
						<InputLabel htmlFor="adornment-password">
							Password
						</InputLabel>
						<Input
							id="adornment-password"
							type={showPassword ? 'text' : 'password'}
							value={password}
							onChange={event => setPassword(event.target.value)}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="Toggle password visibility"
										onClick={() =>
											setShowPassword(prev => !prev)
										}
									>
										{showPassword ? (
											<VisibilityIcon />
										) : (
											<VisibilityOffIcon />
										)}
									</IconButton>
								</InputAdornment>
							}
						/>
					</FormControl>
				</Flex>
			</Demo>
		</>
	);
};

export default () => (
	<Flex w={1}>
		<Box w={1} mt={5.5}>
			<Intro />
			<TextFields
				title={<Title>TextField</Title>}
				description={
					<Paragraph>
						The TextField wrapper component is a complete form
						control including a label, input and help text.
					</Paragraph>
				}
				variant="standard"
			/>
			<TextFields
				title={<Title>Outlined</Title>}
				description={
					<Paragraph>TextField supports outlined styling.</Paragraph>
				}
				variant="outlined"
			/>
			<TextFields
				title={<Title>Filled</Title>}
				description={
					<Paragraph>TextField supports filled styling.</Paragraph>
				}
				variant="filled"
			/>
			<Inputs />
			<InputAdornments />
		</Box>
		<Navigation />
	</Flex>
);
