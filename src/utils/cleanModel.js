export const cleanModel = (data) => {
	const cleanData = data;
	Object.keys(cleanData).forEach((key) => {
		if (cleanData[key] === undefined) {
			delete cleanData[key];
		}
	});
	if (Object.keys(cleanData).length === 0) return null;
	return cleanData;
};
