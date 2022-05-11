import 'dotenv/config';
import registerSuccess from './renders/registerSuccess.js';
import resetAssign from './renders/renderAssign.js';
import renderReset from './renders/ResetPassword.js';
import resetSuccess from './renders/resetSuccess.js';

const renderHtml = (template, data) => {
	switch (template) {
		case 'register':
			return registerSuccess(data);
		case 'reset':
			return renderReset(data);
		case 'reset-success':
			return resetSuccess(data);
		case 'assign-success':
			return resetAssign(data);
		/* c8 ignore next 3 */
		default:
			throw new Error('Template does not exist');
	}
};

export default renderHtml;
