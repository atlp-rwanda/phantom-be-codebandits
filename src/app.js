import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import http from 'http';
import path from 'path';
import { Server } from 'socket.io';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import corsOptions from './configs/cors.js';
import i18n from './configs/i18n.js';
import reqLogger from './configs/reqLogger.js';
import options, { customizationOptions } from './configs/swagger.js';
import logger from './configs/winston.js';
import { AppDataSource } from './data-source.js';
import apiRouter from './routes/apiRouter.js';
import indexRouter from './routes/indexRouter.js';
import { BusRepository } from './simulateApp/models.js';
import errLogger from './utils/errorLogger.js';

const swaggerSpec = swaggerJSDoc(options);
const __dirname = path.resolve();

/* c8 ignore start */
const PORT = process.env.PORT || 5000;
/* c8 ignore next stop */
const app = express();
app.use(express.json({ limit: '30mb', extended: true }));
app.use(cors(corsOptions));
app.use(reqLogger);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(i18n.init);

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
		transports: ['websocket', 'polling'],
		credentials: true,
	},
	allowEIO3: true,
});
const onlineClients = new Set();

io.on('connection', (socket) => {
	const sendSize = (room) => {
		const size = io.sockets.adapter.rooms.get(room)?.size;
		if (size) {
			socket.to(room).emit('waiting_users', {
				size,
			});
		}
	};
	onlineClients.add(socket.id);
	io.emit('active_users', { active: onlineClients.size });
	socket.on('message', (data) => {
		io.emit('send', data);
	});
	socket.on('disconnect', () => {
		onlineClients.delete(socket.id);
		io.emit('active_users', { active: onlineClients.size });
	});
	socket.on('location_update', async (data) => {
		if (!data.id) {
			return;
		}
		let bus = await BusRepository.fetch(data.id);
		if (bus) {
			bus.location = {
				latitude: data.location.lat,
				longitude: data.location.lng,
			};
			bus.locationUpdated = new Date();
			bus.num = data.num;
			await BusRepository.save(bus);
		} else {
			bus = data.bus;
			return;
		}
		socket.to(data.bus.route.code).emit(data.location);
		io.to(data.bus.route.code).emit('location_update', {
			data: data.location,
			bus,
			id: data.id,
		});
	});
	socket.on('bus_stop', async (data) => {
		io.emit('bus_stop', data);
	});
	socket.on('bus_alert', async (data) => {
		if (!data.id) {
			return;
		}
		let bus = await BusRepository.fetch(data.id);
		if (bus) {
			let passengers =
				bus.passengers +
				parseInt(data.boarded, 10) -
				parseInt(data.alighted, 10);
			if (passengers < 0) {
				passengers = 0;
			}
			if (passengers > bus.seats) {
				passengers = bus.seats;
			}
			bus.passengers = passengers || 0;
			await BusRepository.save(bus);
		} else {
			bus = {};
		}
		io.emit('bus_alert', { bus, id: data.id });
	});
	socket.on('finished', async (data) => {
		await BusRepository.remove(data.id);
		io.emit('bus_finished', {
			time: new Date(),
			bus: data.bus,
			id: data.id,
		});
	});
	socket.on('join_room', (data) => {
		socket.join(data.code);
		sendSize(data.code);
	});
	socket.on('leave_room', (data) => {
		socket.leave(data.code);
		sendSize(data.code);
	});
});

app.use('/api/v1', apiRouter);

app.use(
	'/docs',
	swaggerUi.serve,
	swaggerUi.setup(swaggerSpec, customizationOptions, { explorer: true })
);

app.use('/', indexRouter);

app.use(errLogger);

// SETUP SOCKET

// TODO REFACTORING
AppDataSource.initialize()
	.then(async () => {
		logger.info('Postgres database connected');
		server.listen(PORT, () => {
			server.emit('started');
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

export default server;
