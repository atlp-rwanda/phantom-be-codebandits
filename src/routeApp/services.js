export const handeleditRoute = async (Model, routeId, routeInfo) => {
	const routeExist = await Model.findOneBy({ id: routeId });
	if (!routeExist) return false;
	const updatedRoute = await Model.updateById(routeExist.id, routeInfo);
	return updatedRoute;
};

export const handelDeleteRoute = async (Model, routeId) => {
	const routeExist = await Model.findOneBy({ id: routeId });
	if (!routeExist) return false;
	await routeExist.remove();

	return true;
};
