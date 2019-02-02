import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import ButtonBase from './../ButtonBase';
import useStyles from './../system/useStyles';
import { stylesPropType } from './../utils/propTypes';

function getFocusVisibleStyles(props) {
	const {
		focusVisible,
		theme: { palette },
	} = props;

	return (
		focusVisible && {
			focusHighlight: {
				opacity: 0.12,
				':hover': {
					opacity: palette.action.hoverOpacity,
				},
			},
		}
	);
}

function getStyles(props) {
	const { getTransition } = props.theme;

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
				transition: getTransition('opacity', {
					duration: 'shortest',
					easing: 'in',
				}),
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
	const [{ styles, classes }, { children, ...passThru }] = useStyles(
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
