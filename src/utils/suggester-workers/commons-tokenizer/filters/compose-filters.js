export function composeFilters(...filters) {
	//reduceRight = .reverse().reduce
	return filters.reduceRight(
		function (next, current) {
			return (tokens, args) => next(current(tokens, args), args);
		},
		(t) => t
	);
}

export default composeFilters;
