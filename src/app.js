import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import i18n from './configs/i18n.js';
import reqLogger from './configs/reqLogger.js';
import options, { customizationOptions } from './configs/swagger.js';
import logger from './configs/winston.js';
import { AppDataSource } from './data-source.js';
import apiRouter from './routes/apiRouter.js';
import indexRouter from './routes/indexRouter.js';
import errLogger from './utils/errorLogger.js';

const swaggerSpec = swaggerJSDoc(options);
const __dirname = path.resolve();

/* c8 ignore start */
const PORT = process.env.PORT || 5000;
/* c8 ignore next stop */
const app = express();
app.use(cors());
app.use(reqLogger);
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(i18n.init);

app.use('/api/v1', apiRouter);

app.use(
	'/docs',
	swaggerUi.serve,
	swaggerUi.setup(swaggerSpec, customizationOptions, { explorer: true })
);

app.use('/', indexRouter);

app.use(errLogger);
AppDataSource.initialize()
	.then(async () => {
		logger.info('Postgres database connected');
		app.listen(PORT, () => {
			app.emit('started');
			logger.info(`app is listening on port ${PORT}`);
		});
	})
	.catch((_error) => {
		/* c8 ignore next 6 */
		// eslint-disable-next-line no-console
		console.log(_error);
		logger.error(
			"The server couldn't be started. The database is not connected"
		);
	});

export default app;
