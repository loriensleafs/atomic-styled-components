import React from 'react';
import Flex from './../Flex';

const DemoBox = ({ children, ...props }) => <Flex {...props}>{children}</Flex>;

DemoBox.defaultProps = {
	position: 'relative',
	mb: 4,
	mx: 'auto',
	p: [3, 4],
	justifyContent: ['flex-start', null, 'center'],
	alignItems: 'center',
	bg: 'grey.light',
	wrap: true,
};

export default DemoBox;
