import i18n from 'i18n';
import path from 'path';

const __dirname = path.resolve();

i18n.configure({
	locales: ['en', 'kn', 'fr'],
	defaultLocale: 'en',
	directory: `${__dirname}/locales/`,
	headers: 'Accept-Language',
});

export default i18n;
