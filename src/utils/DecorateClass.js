const DecorateClass = (decorators, target) => {
	// eslint-disable-next-line no-param-reassign
	decorators = Array.isArray(decorators) ? decorators : [decorators];
	decorators.forEach((decorator) => decorator(target));
	return target;
};

export default DecorateClass;
