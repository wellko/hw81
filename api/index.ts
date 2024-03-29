import mongoose from 'mongoose';
import express from 'express';
import linksRouter from "./routers/links";
import shortUrl from "./routers/shortUrl";
import cors = require("cors");

const app = express();
app.use(cors());
const port = 8000;
app.use(express.json());
app.use('/links', linksRouter);
app.use('/', shortUrl);

const run = async () => {
	mongoose.set('strictQuery', false);
	await mongoose.connect('mongodb://localhost/shortUrl');
	app.listen(port, () => {
		console.log(`Server started on ${port} port!`);
	});
	process.on('exit', () => {
		mongoose.disconnect();
	});
};

run().catch(console.error);

