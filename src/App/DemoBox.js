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
	wrap: 'wrap',
	bg: 'grey.light',
	radius: 'round',
};

export default DemoBox;
