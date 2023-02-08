import express = require("express");
import urlShorter from "../models/UrlShorter";
import ShortUniqueId from "short-unique-id";

const linksRouter = express.Router();
const uid = new ShortUniqueId({
	length: 7,
	dictionary: 'alpha'
});

linksRouter.post('/', async (req,res) =>{
	let newUrlData = {
		shortUrl: '',
		originalUrl: req.body.url
	}

	const idTest = async () => {
		const newID = uid();
		const identical = await urlShorter.findOne({shortUrl: newID});
		if (identical){
			console.log('identical')
			await idTest();
		}else {
			newUrlData.shortUrl = newID;
		}
	}

	await idTest();

	const newUrl = new urlShorter(newUrlData);
	try {
		await newUrl.save();
		res.send(newUrlData);
	} catch (error) {
		return res.status(400).send(error);
	}
})

export default linksRouter;