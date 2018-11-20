import merge from './../utils/pureRecursiveMerge';

const addAliases = (arr, aliases) =>
	aliases.forEach((key, i) =>
		Object.defineProperty(arr, key, {
			enumerable: false,
			get() {
				return this[i];
			},
		}),
	);

export let breakpoints = [0, 480, 765, 960, 1200, 1600];

export const aliases = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

export default overrides => {
	breakpoints = [...breakpoints, ...overrides];
	const mediaQueries = breakpoints
		.map((bp, idx, arr) => ({
			[aliases[idx]]: `@media screen and (${idx > 0 ? 'min' : 'max'}-width: ${
				idx > 0 ? bp : arr[idx + 1] - 1
			}px)`,
		}))
		.reduce(merge, {});

	addAliases(breakpoints, aliases);

	return {
		breakpoints,
		mediaQueries,
	};
};
