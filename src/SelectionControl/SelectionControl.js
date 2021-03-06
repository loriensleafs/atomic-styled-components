import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import IconButton from '../IconButton';
import useInput from '../hooks/useInput';
import useStyles from '../system/useStyles';

const baseStyles = {
	root: {
		display: 'inline-flex',
		alignItems: 'center',
		transition: 'none',
	},
	input: {
		zIndex: 2,
		position: 'absolute',
		top: '0px',
		left: '0px',
		width: '100%',
		height: '100%',
		margin: '0px',
		padding: '0px',
		cursor: 'inherit',
		opacity: 0,
	},
};

function SelectionControl(props) {
	const [checked, handleChange] = useInput(props);
	const {
		classes,
		props: {
			autoFocus,
			checkedIcon,
			disabled,
			icon,
			id,
			inputProps,
			inputRef,
			name,
			onBlur,
			onChange,
			onFocus,
			readOnly,
			required,
			tabIndex,
			type,
			value,
			...passThru
		},
		styles,
	} = useStyles({ ...props, checked }, null, { baseStyles, nested: true });
	const hasLabelFor = type === 'checkbox' || type === 'radio';

	const handleFocus = useCallback(event => onFocus && onFocus(event), []);

	const handleBlur = useCallback(event => onBlur && onBlur(event), []);

	return (
		<IconButton
			as="span"
			disabled={disabled}
			onFocus={handleFocus}
			onBlur={handleBlur}
			role={undefined}
			styles={styles}
			tabIndex={null}
			{...passThru}
		>
			{checked ? (checkedIcon ? checkedIcon : icon) : icon}
			<input
				autoFocus={autoFocus}
				checked={checked}
				className={classes.input}
				disabled={disabled}
				id={hasLabelFor && id}
				name={name}
				onChange={handleChange}
				readOnly={readOnly}
				ref={inputRef}
				required={required}
				tabIndex={tabIndex}
				type={type}
				value={value}
				{...inputProps}
			/>
		</IconButton>
	);
}

SelectionControl.displayName = 'SelectionControl';

SelectionControl.propTypes = {
	// If `true`, the input will be focused during the first mount.
	autoFocus: PropTypes.bool,
	// If `true`, the component is checked.
	checked: PropTypes.bool,
	// The icon to display when the component is checked.
	checkedIcon: PropTypes.node,
	className: PropTypes.string,
	defaultChecked: PropTypes.bool,
	// If `true`, the switch will be disabled.
	disabled: PropTypes.bool,
	// If `true`, the ripple effect will be disabled.
	disableRipple: PropTypes.bool,
	// The icon to display when the component is unchecked.
	icon: PropTypes.node.isRequired,
	// The id of the `input` element.
	id: PropTypes.string,
	// Attributes applied to the `input` element.
	inputProps: PropTypes.object,
	// If `true`, the component appears indeterminate.
	indeterminate: PropTypes.bool,
	// The icon to display when the component is indeterminate.
	indeterminateIcon: PropTypes.node,
	// Use that property to pass a ref callback to the native input component.
	inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	name: PropTypes.string,
	onBlur: PropTypes.func,
	/**
	 * Callback fired when the state is changed.
	 *
	 * @param {object} event The event source of the callback.
	 * You can pull out the new value by accessing `event.target.checked`.
	 * @param {boolean} checked The `checked` value of the switch
	 */
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	/**
	 * It prevents the user from changing the value of the field
	 * (not from interacting with the field).
	 */
	readOnly: PropTypes.bool,
	// If `true`, the input will be required.
	required: PropTypes.bool,
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	// The input component property `type`.
	type: PropTypes.string.isRequired,
	// The value of the component.
	value: PropTypes.string,
};

export default SelectionControl;
