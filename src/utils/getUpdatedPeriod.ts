export const getUpdatedPeriodPart = (currentYear: number, targetYear: number, spread: number = 1): number => {
	if (currentYear > targetYear) {
		return currentYear - spread;
	} else if (currentYear < targetYear) {
		return currentYear + spread;
	} else {
		return targetYear;
	}
};
