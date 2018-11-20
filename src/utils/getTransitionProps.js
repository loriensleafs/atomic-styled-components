export default (timeout, style = {}, mode) => ({
	duration: style.transitionDuration || typeof timeout === 'number' ? timeout : timeout[mode],
	delay: style.transitionDelay,
});
