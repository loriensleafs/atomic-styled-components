import React, { Component } from 'react';
import PropTypes from 'prop-types';
import merge from 'deep-extend';
import IconButton from './../IconButton';
import { classify, themify } from './../themify';

/**
  * Maps props to checked state styles
  * @param {object} props
  * @param {object} props.theme
  * @param {string} [props.checked]
  */
export const getCheckedStyles = ({ checked, theme }) =>
	checked
		? {
				iconButton: {
					transform: 'translate3d(14px, 0px, 0px)',
				},
				icon: {
					boxShadow: theme.elevation[2],
				},
				bar: {
					opacity: 0.5,
				},
			}
		: {};

/**
  * Maps props to color styles
  * @param {object} props
  * @param {object} props.theme
  * @param {string} [props.color='secondary']
  */
export const getColorStyles = ({ color, theme }) =>
	color === 'primary' || color === 'secondary'
		? {
				iconButton: {
					color: theme.colors[color].main,
				},
				bar: {
					backgroundColor: theme.colors[color].main,
				},
			}
		: {};

/**
	   * Maps props to disabled state styles
	   * @param {object} props
	   * @param {object} props.theme
	   * @param {string} [props.disabled=false]
	   */
export const getDisabledStyles = ({ disabled, theme }) =>
	disabled
		? {
				iconButton: {
					color:
						theme.colors.type === 'light'
							? theme.colors.gray.main
							: theme.colors.gray.dark,
				},
				icon: {
					boxShadow: theme.elevation[1],
				},
				bar: {
					backgroundColor:
						theme.colors.type === 'light'
							? theme.colors.common.black
							: theme.colors.common.white,
				},
			}
		: {};

/**
  * Gets styles for all components/elements
  * @param {object} props
  */
const styles = (props) =>
	merge(
		{
			root: {
				display: 'inline-flex',
				alignItems: 'center',
				transition: 'none',
				':hover': {
					// Disable the hover effect for the IconButton
					backgroundColor: 'transparent',
				},
			},
			bar: {
				position: 'absolute',
				top: '50%',
				left: '50%',
				width: '34px',
				height: '14px',
				marginTop: '-7px',
				marginLeft: '-17px',
				display: 'block',
				borderRadius: `${14 / 2}px`,
				backgroundColor:
					props.theme.colors.type === 'light'
						? props.theme.colors.common.black
						: props.theme.colors.common.white,
				opacity: props.theme.colors.type === 'light' ? 0.38 : 0.3,
				transition: `opacity ${props.theme.duration.shortest}ms ${props.theme.easing
					.easeInOut}`,
			},
			icon: {
				width: '20px',
				height: '20px',
				boxShadow: props.theme.elevation[1],
				backgroundColor: 'currentColor',
				borderRadius: '50%',
			},
			iconButton: {
				zIndex: 1,
				color:
					props.theme.colors.type === 'light'
						? props.theme.colors.gray.light
						: props.theme.colors.gray.main,
				transition: `transform ${props.theme.duration.shortest} ${props.theme.easing
					.easeInOut}`,
			},
			input: {
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
		getCheckedStyles(props),
		props.$styles,
	);

/**
 * Creates a styled SwitchBase component
 * @param {object} props
 */
class Switch extends Component {
	input = null;

	isControlled = null;

	constructor(props) {
		super();
		this.isControlled = props.checked != null;
		if (!this.isControlled) {
			// Not a controlled component, use internal state
			this.state.checked = props.defaultChecked !== undefined ? props.defaultChecked : false;
		}
	}

	state = {};

	handleFocus = (event) => {
		if (this.props.onFocus) this.props.onFocus(event);
	};

	handleBlur = (event) => {
		if (this.props.onBlur) this.props.onBlur(event);
	};

	handleInputChange = (event) => {
		const checked = event.target.checked;

		if (!this.isControlled) this.setState({ checked });

		if (this.props.onChange) this.props.onChange(event);
	};

	render() {
		const {
			autoFocus,
			checked: checkedProp,
			checkedIcon,
			className,
			disabled: disabledProp,
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
		} = this.props;
		const { root: rootStyles, input: inputStyles } = styles({ ...this.state, ...this.props });

		let disabled = disabledProp;

		const checked = this.isControlled ? checkedProp : this.state.checked;
		const hasLabelFor = type === 'checkbox' || type === 'radio';

		return (
			<span>
				<IconButton
					component="span"
					$styles={{ root: rootStyles }}
					disabled={disabled}
					tabIndex={null}
					role={undefined}
					onFocus={this.handleFocus}
					onBlur={this.onBlur}
					{...passThru}
				>
					{checked ? checkedIcon : icon}
					<input
						autoFocus={autoFocus}
						checked={checked}
						className={classify(inputStyles)}
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
				<span />
			</span>
		);
	}
}

Switch.propTypes = {
	/**
	 * If `true`, the input will be focused during the first mount.
	 */
	autoFocus: PropTypes.bool,
	/**
	 * If `true`, the component is checked.
	 */
	checked: PropTypes.oneOfType([ PropTypes.bool, PropTypes.string ]),
	/**
	 * The icon to display when the component is checked.
	 */
	checkedIcon: PropTypes.node.isRequired,
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
	inputRef: PropTypes.oneOfType([ PropTypes.func, PropTypes.object ]),
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
	$styles: PropTypes.object,
	tabIndex: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
	/**
	 * The input component property `type`.
	 */
	type: PropTypes.string.isRequired,
	/**
	 * The value of the component.
	 */
	value: PropTypes.string,
};

export default themify(Switch);
