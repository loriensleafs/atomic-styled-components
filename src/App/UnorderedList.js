import React from 'react';
import PropTypes from 'prop-types';
import Box from './../Box';
import useStyles from './../system/useStyles';

const getStyles = props => ({
	root: {
		listStylePosition: props.listPosition,
	},
});

getStyles.propTypes = {
	listPosition: PropTypes.oneOf(['inherit', 'inside', 'outside']),
};

function UnorderedList(props) {
	const {
		props: { children, listPosition, ...passThru },
		styles,
	} = useStyles(props, [getStyles]);

	return (
		<Box as="ul" styles={styles.root} {...passThru}>
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
