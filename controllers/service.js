const Service = require("../models/service");
const fs = require("fs");

exports.addService = (req, res, next) => {
	// const url = req.protocol + "://" + req.get("host");
	// req.body.service = JSON.parse(req.body);
	const service = new Service({
		userId: req.cookies.userId,
		title: req.body.title,
		category: req.body.category,
		subCategory: req.body.subCategory,
		description: req.body.description,
		image: req.body.image,
		// image: url + "/images/" + req.file.filename,
		price: req.body.price,
		deadline: req.body.deadline,
		buyerInstruction: req.body.buyerInstruction,
	});
	service
		.save()
		.then(() => {
			res.status(201).json({
				message: "Service added successfully!",
			});
		})
		.catch((error) => {
			res.status(500).json({
				error: error,
			});
		});
};
