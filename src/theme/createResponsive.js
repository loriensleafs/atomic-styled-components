let breakpoints = [480, 765, 960, 1200, 1600];

const aliases = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

function getMediaQuery(mq = 'sm', max = false) {
	const aliasIdx = aliases.indexOf(mq);
	const bp = aliasIdx > -1 ? breakpoints[aliasIdx] : mq;

	return `@media screen and (${max ? 'max' : 'min'}-width: ${bp}px)`;
}

function createResponsive(overrides) {
	breakpoints = [...breakpoints, ...overrides];

	return {
		breakpoints,
		getMq: getMediaQuery,
		mediaQueries: aliases.map(alias => getMediaQuery(alias)),
	};
}

export { aliases, breakpoints, getMediaQuery };

export default createResponsive;
