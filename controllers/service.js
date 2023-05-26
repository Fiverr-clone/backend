const Service = require("../models/service");

exports.addService = (req, res, next) => {
	console.log("body => ", req.body);
	console.log("file => ", req.file);

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
			console.log("body => ", req.body);
			console.log("file => ", req.file);
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
