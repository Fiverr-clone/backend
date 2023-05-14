const Service = require("../models/service");

const Category = require("../models/category");
const SubCategory = require("../models/sub_category");

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLSchema,
	GraphQLList,
} = require("graphql");

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

exports.getServices = (req, res, next) => {
	Service.find()
		.then((services) => {
			res.status(200).json({
				message: "Services fetched successfully!",
				services: services,
			});
		})
		.catch((error) => {
			res.status(500).json({
				error: error,
			});
		});
};

exports.getServicesBySubCat = (req, res) => {
	const subcategoryId = req.params.subcategoryId;

	Service.find({ subCategory: subcategoryId })
		.then((services) => {
			res.status(200).json({
				message: "Services fetched successfully!",
				// subCat: subCat,
				services: services,
			});
		})
		.catch((err) => {
			console.error(err);
			res
				.status(500)
				.json({ error: "An error occurred while fetching services." });
		});
};
