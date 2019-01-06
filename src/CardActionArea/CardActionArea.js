import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import ButtonBase from './../ButtonBase';
import useStyles from './../system/useStyles';
import { stylesPropType } from './../utils/propTypes';

function getFocusVisibleStyles({ focusVisible, theme }) {
	if (focusVisible) {
		return {
			focusHighlight: {
				opacity: 0.12,
				':hover': {
					opacity: theme.palette.action.hoverOpacity,
				},
			},
		};
	}
	return null;
}

function getStyles(props) {
	return {
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
				transition: props.theme.getTransition(
					'opacity',
					'shortest',
					'in',
				),
			},
			...getFocusVisibleStyles(props),
		},
	};
}
getStyles.propTypes = {
	focusVisible: PropTypes.bool,
};

function CardActionArea(props) {
	const [focusVisible, setFocusVisible] = useState(false);
	const [{ children, ...passThru }, styles, classes] = useStyles(
		{ ...props, focusVisible },
		getStyles,
	);

	const handleFocusVisible = useCallback(event => setFocusVisible(true), []);

	const handleBlur = useCallback(event => setFocusVisible(false), []);

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
	/**
	 * The content of the component.
	 */
	children: PropTypes.node,
	/**
	 * @ignore
	 */
	className: PropTypes.string,
	...stylesPropType,
};

export default CardActionArea;
