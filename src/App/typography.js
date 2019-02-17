import React from 'react';
import Typography from './../Typography';

export const Header = props => (
	<Typography variant="h2" mb={3} px={[3.5, 4, 5]} {...props} />
);

export const Title = props => (
	<Typography variant="h4" mt={3.5} mb={4} px={[3.5, 4, 5]} {...props} />
);

export const Subtitle = props => (
	<Typography variant="h5" mt={3.5} mb={4} px={[3.5, 4, 5]} {...props} />
);

export const Paragraph = props => (
	<Typography mt={3} mb={3} px={[3.5, 4, 5]} {...props} />
);
