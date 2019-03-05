import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import ButtonBase from '../ButtonBase';
import useStyles from '../system/useStyles';
import { stylesPropType } from '../utils/propTypes';

const getFocusVisibleStyles = ({ focusVisible, theme: { palette } }) =>
	focusVisible && {
		focusHighlight: {
			opacity: 0.12,
			':hover': {
				opacity: palette.action.hoverOpacity,
			},
		},
	};

const getStyles = props => ({
	root: {
		display: 'block',
		width: '100%',
		textAlign: 'inherit',
	},
	focusHighlight: {
		...{
			position: 'absolute',
			top: '0px',
			right: '0px',
			bottom: '0px',
			left: '0px',
			opacity: 0,
			backgroundColor: 'currentcolor',
			pointerEvents: 'none',
			transition: props.theme.getTransition('opacity', {
				duration: 'shortest',
				easing: 'in',
			}),
		},
		...getFocusVisibleStyles(props),
	},
});
getStyles.propTypes = {
	focusVisible: PropTypes.bool,
};

function CardActionArea(props) {
	const [focusVisible, setFocusVisible] = useState(false);
	const {
		classes,
		props: { children, ...passThru },
		styles,
	} = useStyles({ ...props, focusVisible }, getStyles, { nested: true });

	const handleFocusVisible = useCallback(() => setFocusVisible(true), []);

	const handleBlur = useCallback(() => setFocusVisible(false), []);

	return (
		<ButtonBase
			styles={styles.root}
			onFocusVisible={handleFocusVisible}
			onBlur={handleBlur}
			{...passThru}
		>
			{children}
			<span className={classes.focusHighlight} />
		</ButtonBase>
	);
}

CardActionArea.displayName = 'CardActionArea';

CardActionArea.propTypes = {
	// The content of the component.
	children: PropTypes.node,
	className: PropTypes.string,
	...stylesPropType,
};

export default CardActionArea;
