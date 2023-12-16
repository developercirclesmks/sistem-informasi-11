type TDateVariant = "short" | "medium" | "long" | "full";

/**
 * @brief format date to "nice" string
 * @param date date string, example: 2021-08-01T00:00:00.000Z or just 2021-08-01
 * @param variant variant of date,  example: short, medium, long, full
 * @returns formatted date
 */
export const formatDate = (date: string, variant: TDateVariant) => {
	return new Intl.DateTimeFormat("en-UK", {
		dateStyle: variant,
	}).format(new Date(date));
};

/**
 * @param date date string, example: 2021-08-01T00:00:00.000Z or just 2021-08-01
 * @returns formatted date to hour:minute
 */
export const formatToHour = (date: string) => {
	return new Intl.DateTimeFormat("en-UK", {
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
	}).format(new Date(date));
};
