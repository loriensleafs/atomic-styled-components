import React, { cloneElement, isValidElement, useContext } from 'react';
import ThemeContext from './../theme/ThemeContext';
import cn from './../styles/className';
import { space as spaceSystem } from 'styled-system';

export const getColorStyles = ({ color, theme }) =>
	color === 'default'
		? {
				root: {
					color: theme.colors.bg.default,
					backgroundColor: theme.colors.grey[theme.colors.type],
				},
		  }
		: {};

export const styles = props =>
	merge(
		{
			root: {
				position: 'relative',
				display: 'flex',
				alignItems: 'center',
				justifyItems: 'center',
				flexShrink: 0,
				width: 40,
				height: 40,
				fontFamily: props.theme.font,
				fontSize: `${props.theme.fontSizes[2]}${props.theme.fontUnit}`,
				borderRadius: '50%',
				overflow: 'hidden',
				userSelect: 'none',
				...spaceSystem(props),
			},
			img: {
				width: '100%',
				height: '100%',
				textAlign: 'center',
				objectFit: 'cover',
			},
		},
		getColorStyles(props),
		props.style,
	);

const Avatar = props => {
	const { theme } = useContext(ThemeContext);
	const {
		alt,
		children: childrenProps,
		className,
		component: Component,
		imgProps,
		sizes,
		src,
		srcSet,
		styles,
		...passThru
	} = props;

	const { root: rootStyles, img: imgStyles } = styles({ ...props, ...{ theme } });

	let children = childrenProp;

	if (src || srcSet) {
		children = (
			<img
				alt={alt}
				src={src}
				srcSet={srcSet}
				sizes={sizes}
				className={imgStyles}
				{...imgProps}
			/>
		);
	} else if (isValidElement(childrenProp)) {
		children = cloneElement(childrenProp, { className: cn(imgStyles) });
	}

	return (
		<Component className={classify(rootStyles)} {...passThru}>
			{children}
		</Component>
	);
};
