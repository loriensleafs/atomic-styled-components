import React from 'react';
import SvgIcon from './../SvgIcon';

const IndeterminateCheckBox = props => (
	<SvgIcon {...props}>
		<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z" />
	</SvgIcon>
);

IndeterminateCheckBox.displayName = 'IndeterminateCheckBoxIcon';

export default IndeterminateCheckBox;
