export const convertMinutesToHourMinute = (totalMinutes: number) => {
	const hours: number = Math.floor(totalMinutes / 60);
	const minutes: number = totalMinutes % 60;
	return { hours, minutes };
};
