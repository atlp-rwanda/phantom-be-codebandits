import 'dotenv/config';
import bodyparser from 'body-parser';
import express from 'express';
import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import options from './configs/swagger.js';
import logger from './configs/winston.js';
import handleResponse from './controllers/handleResponse.js';
import apiRouter from './routes/apiRouter.js';
import i18n from './configs/i18n.js';

const swaggerSpec = swaggerJSDoc(options);
const __dirname = path.resolve();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyparser.json());
app.use(express.static(`${__dirname}/public`));
app.use(i18n.init);
app.use('/api/v1', apiRouter);

app.get('/', (req, res) =>
	handleResponse(res, 200, {
		message: res.__('welcome'),
	})
);

app.use(
	'/docs',
	swaggerUi.serve,
	swaggerUi.setup(swaggerSpec, { explorer: true })
);

app.all('*', (req, res) =>
	handleResponse(res, 404, { message: res.__('notFound') })
);

app.listen(PORT, () => {
	logger.info(`app is listening on port ${PORT}`);
});
