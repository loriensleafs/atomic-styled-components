import React, { cloneElement, isValidElement } from 'react';
import PropTypes from 'prop-types';
import { styled } from 'styletron-react';
import { space as spaceSystem } from 'styled-system';
import { classify, themify } from './../theme';

export const getColorStyles = ({ color, theme }) =>
	color === 'default'
		? {
				root: {
					color: theme.colors.bg.default,
					backgroundColor: theme.colors.grey[theme.colors.type],
				},
			}
		: {};

export const styles = (props) =>
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
		props.$style,
	);

const Avatar = (props) => {
	const {
		alt,
		children: childrenProps,
		className,
		component: Component,
		imgProps,
		sizes,
		src,
		srcSet,
		$styles,
		theme,
		...passThru
	} = props;

	const { root: rootStyles, img: imgStyles } = styles(props);

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
		children = cloneElement(childrenProp, { className: classify(imgStyles) });
	}

	return (
		<Component className={classify(rootStyles)} {...passThru}>
			{children}
		</Component>
	);
};
