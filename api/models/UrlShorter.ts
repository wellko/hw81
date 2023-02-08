import mongoose from "mongoose";

const Schema = mongoose.Schema;

const urlShortedSchema = new Schema({
	shortUrl: {
		type: String,
		required: true
	},
	originalUrl: {
		type: String,
		required: true
	},
});


const urlShorter = mongoose.model('urlShorter', urlShortedSchema);

export default urlShorter;