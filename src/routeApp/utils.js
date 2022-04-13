// export const RouteCodeGenerator = () => {
// 	const code = Math.floor(100 + Math.random()* 500);
// 	return code;
// };

export const RouteCodeGenerator = () => {
	const code = Math.random().toString(36).slice(-8);
	return code.toUpperCase();
};
