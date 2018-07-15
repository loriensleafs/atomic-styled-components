const createMediaQuery = (n) => `@media screen and (min-width:${n}px)`;

const addAliases = (arr, aliases) =>
	aliases.forEach((key, i) =>
		Object.defineProperty(arr, key, {
			enumerable: false,
			get() {
				return this[i];
			},
		}),
	);

export const breakpoints = [ 480, 765, 960, 1200, 1600 ];

export const mediaQueries = breakpoints.map(createMediaQuery);

const aliases = [ 'xs', 'sm', 'md', 'lg', 'xl' ];

addAliases(breakpoints, aliases);
addAliases(mediaQueries, aliases);

export default {
	breakpoints,
	mediaQueries,
};
