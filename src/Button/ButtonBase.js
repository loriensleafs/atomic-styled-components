import PropTypes from 'prop-types';
import tag from 'clean-tag';
import { styled } from './../styled';

const ButtonBase = styled(tag.button, ({ theme, ...props }) => ({
	...{
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		// Removes the grey highlight.
		WebkitTapHighlightColor: 'transparent',
		backgroundColor: 'transparent',
		// Disable the focus ring for mouse, touch and keyboard users.
		outline: 'none',
		border: 0,
		// Remove the margin in Safari.
		margin: 0,
		// Remove the padding in Firefox.
		padding: 0,
		borderRadius: 0,
		cursor: 'pointer',
		userSelect: 'none',
		verticalAlign: 'middle',
		// Reset
		'-moz-appearance': 'none',
		'-webkit-appearance': 'none',
		textDecoration: 'none',
		// So we take precedent over the style of a native <a /> element.
		color: 'inherit',
		':disabled': {
			// Disable the link interactions.
			pointerEvents: 'none',
			cursor: 'default',
		},
	},
}));

ButtonBase.displayName = 'ButtonBase';

ButtonBase.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	labelClassName: PropTypes.string,
	color: PropTypes.oneOf([ 'default', 'inherit', 'primary', 'secondary' ]),
	disabled: PropTypes.bool,
	disableFocusRipple: PropTypes.bool,
	disableRipple: PropTypes.bool,
	fullWidth: PropTypes.bool,
	href: PropTypes.string,
	mini: PropTypes.bool,
	size: PropTypes.oneOf([ 'small', 'medium', 'large' ]),
	type: PropTypes.string,
	variant: PropTypes.oneOf([ 'text', 'outlined', 'contained', 'fab', 'extendedFab' ]),
};

export default ButtonBase;
