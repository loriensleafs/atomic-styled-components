import React from 'react';
import PropTypes from 'prop-types';
import Box from './../Box';
import useStyles from './../system/useStyles';

function getStyles(props) {
	return {
		listStylePosition: props.listPosition,
	};
}

getStyles.propTypes = {
	listPosition: PropTypes.oneOf(['inherit', 'inside', 'outside']),
};

function UnorderedList(props) {
	const [{ styles }, { children, listPosition, ...passThru }] = useStyles(
		props,
		[getStyles],
	);

	return (
		<Box as="ul" styles={styles} {...passThru}>
			{children}
		</Box>
	);
}

UnorderedList.propTypes = {
	...getStyles.propTypes,
};

UnorderedList.defaultProps = {
	listPosition: 'inside',
};

export default UnorderedList;
