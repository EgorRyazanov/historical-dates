export const setNumberPrefix = (targetValue: number, prefix: string = '0'): string => {
	if (0 < targetValue && targetValue < 10) {
		return `${prefix}${targetValue}`;
	}

	return `${targetValue}`;
};
