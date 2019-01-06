function addAliases(arr, aliases) {
	return aliases.forEach((key, i) =>
		Object.defineProperty(arr, key, {
			enumerable: false,
			get() {
				return this[i];
			},
		}),
	);
}

export let breakpoints = [480, 765, 960, 1200, 1600];

export const aliases = ['sm', 'md', 'lg', 'xl', 'xxl'];

function createResponsive(overrides) {
	breakpoints = [...breakpoints, ...overrides];
	const mediaQueries = breakpoints.map(
		bp => `@media screen and (min-width: ${bp}px)`,
	);

	function getMediaQuery(mq) {
		return mediaQueries[mq.indexOf(aliases)];
	}

	return {
		breakpoints,
		mediaQueries,
		getMediaQuery,
	};
}

export default createResponsive;
