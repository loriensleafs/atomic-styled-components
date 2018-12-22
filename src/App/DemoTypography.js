import React from 'react';
import Typography from './../Typography';

export const PageHeader = ({ children, ...props }) => (
	<Typography variant="h2" mb={3} px={[3.5, 4, 5]} {...props}>
		{children}
	</Typography>
);

export const SectionHeader = ({ children, ...props }) => (
	<Typography variant="h5" mb={4} px={[3.5, 4, 5]} {...props}>
		{children}
	</Typography>
);

export const Paragraph = ({ children, ...props }) => (
	<Typography mb={4} px={[3.5, 4, 5]} {...props}>
		{children}
	</Typography>
);
