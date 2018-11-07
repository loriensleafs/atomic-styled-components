import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './../theme/ThemeContext';
import merge from './../utils/pureRecursiveMerge';
import IconButton from './../IconButton';
import cn from './../theme/className';
import { isFunc } from './../utils/helpers';

const getStyles = props =>
	merge(
		{
			iconButtonStyles: {
				rootStyles: {
					display: 'inline-flex',
					alignItems: 'center',
					transition: 'none',
					':hover': {
						// Disable the hover effect for the IconButton
						backgroundColor: 'transparent',
					},
				},
			},
			inputStyles: {
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
		},
		isFunc(props.styles) ? props.styles(props) : props.styles,
	);

class SelectionControl extends Component {
	constructor(props) {
		super();
		this.isControlled = props.checked != null;
		this.state = {};
		if (!this.isControlled) {
			// Not a controlled component, use internal state
			this.state.checked = props.defaultChecked !== undefined ? props.defaultChecked : false;
		}
	}

	handleFocus = event => {
		if (this.props.onFocus) this.props.onFocus(event);
	};

	handleBlur = event => {
		if (this.props.onBlur) this.props.onBlur(event);
	};

	handleInputChange = event => {
		const checked = event.target.checked;
		if (!this.isControlled) this.setState({ checked });
		if (this.props.onChange) this.props.onChange(event, checked);
	};

	render() {
		const { theme } = this.context;
		const {
			autoFocus,
			checked: checkedProp,
			checkedIcon,
			className,
			color,
			disabled: disabledProp,
			icon,
			id,
			indeterminate,
			indeterminateIcon,
			inputProps,
			inputRef,
			name,
			onBlur,
			onChange,
			onFocus,
			readOnly,
			required,
			styles,
			tabIndex,
			type,
			value,
			...passThru
		} = this.props;
		const { iconButtonStyles, inputStyles } = getStyles({
			...this.state,
			...this.props,
			...{ theme },
		});

		let disabled = disabledProp;

		const checked = this.isControlled ? checkedProp : this.state.checked;
		const hasLabelFor = type === 'checkbox' || type === 'radio';

		return (
			<IconButton
				color={checked ? color : null}
				component="span"
				styles={iconButtonStyles}
				disabled={disabled}
				tabIndex={null}
				role={undefined}
				onFocus={this.handleFocus}
				onBlur={this.onBlur}
				{...passThru}>
				{checked ? (checkedIcon ? checkedIcon : icon) : icon}
				<input
					autoFocus={autoFocus}
					checked={checked}
					className={cn(inputStyles)}
					disabled={disabled}
					id={hasLabelFor && id}
					name={name}
					onChange={this.handleInputChange}
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
}

SelectionControl.contextType = ThemeContext;

SelectionControl.propTypes = {
	/**
	 * If `true`, the input will be focused during the first mount.
	 */
	autoFocus: PropTypes.bool,
	/**
	 * If `true`, the component is checked.
	 */
	checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
	className: PropTypes.string,
	defaultChecked: PropTypes.bool,
	/**
	 * If `true`, the switch will be disabled.
	 */
	disabled: PropTypes.bool,
	/**
	 * If `true`, the ripple effect will be disabled.
	 */
	disableRipple: PropTypes.bool,
	/**
	 * The icon to display when the component is unchecked.
	 */
	icon: PropTypes.node.isRequired,
	/**
	 * The id of the `input` element.
	 */
	id: PropTypes.string,
	/**
	 * If `true`, the component appears indeterminate.
	 */
	indeterminate: PropTypes.bool,
	/**
	 * The icon to display when the component is indeterminate.
	 */
	indeterminateIcon: PropTypes.node,
	/**
	 * Attributes applied to the `input` element.
	 */
	inputProps: PropTypes.object,
	/**
	 * Use that property to pass a ref callback to the native input component.
	 */
	inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	/*
	 * @ignore
	 */
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
	/**
	 * If `true`, the input will be required.
	 */
	required: PropTypes.bool,
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	/**
	 * The input component property `type`.
	 */
	type: PropTypes.string.isRequired,
	/**
	 * The value of the component.
	 */
	value: PropTypes.string,
};

export default SelectionControl;
