const Service = require("../models/service");
// const fs = require("fs");

exports.addService = (req, res, next) => {
	const service = new Service({
		userId: req.user.userId,
		title: req.body.title,
		category: req.body.category,
		subCategory: req.body.subCategory,
		description: req.body.description,
		image: req.file.path,
		price: req.body.price,
		deliveryTime: req.body.deliveryTime,
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
