import express = require("express");
import urlShorter from "../models/UrlShorter";

const shortUrlRouter = express.Router();

shortUrlRouter.get('/:shortUrl', async (req,res )=>{
	const identical = await urlShorter.findOne({shortUrl: req.params.shortUrl.toString()});
	if (identical) {
		res.status(301).redirect(identical.originalUrl);
	}else {
		res.status(404).send('Error')
	}
})

export default shortUrlRouter;