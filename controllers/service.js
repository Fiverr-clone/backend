const Service = require("../models/service");
const fs = require("fs");

exports.addService = (req, res, next) => {
	const userId = req.cookies.userId;
	const token = req.cookies.token;
	res.status(201).json({
		userId: userId,
		token: token,
	});
	// const url = req.protocol + "://" + req.get("host");
	// req.body.service = JSON.parse(req.body.service);
	// const service = new Service({
	// 	userId: req.body.service.userId,
	// 	title: req.body.service.title,
	// 	description: req.body.service.description,
	// 	imageUrl: url + "/images/" + req.file.filename,
	// 	price: req.body.service.price,
	// });
};
