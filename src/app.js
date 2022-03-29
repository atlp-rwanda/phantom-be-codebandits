import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import options from './configs/swagger.js';
import logger from './configs/winston.js';
import handleResponse from './controllers/handleResponse.js';
import apiRouter from './routes/apiRouter.js';

const swaggerSpec = swaggerJSDoc(options);

const PORT = process.env.PORT || 5000;
const app = express();

app.use('/api/v1', apiRouter);

app.get('/', (req, res) =>
	res.status(200).json(
		handleResponse(200, {
			message: 'Welcome to Phantom backend',
		})
	)
);

app.use(
	'/docs',
	swaggerUi.serve,
	swaggerUi.setup(swaggerSpec, { explorer: true })
);

app.all('*', (req, res) =>
	res
		.status(404)
		.json(handleResponse(404, { message: 'Requested page not found' }))
);

app.listen(PORT, () => {
	logger.info(`app is listening on port ${PORT}`);
});
