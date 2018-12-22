import React from 'react';
import SvgIcon from './../SvgIcon';

const ExpandMore = props => (
	<SvgIcon {...props}>
		<path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
		<path fill="none" d="M0 0h24v24H0z" />
	</SvgIcon>
);

ExpandMore.displayName = 'ExpandMoreIcon';

export default ExpandMore;
