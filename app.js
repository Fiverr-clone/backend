const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.CLUSTER_USERNAME}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const sub_categoryRoutes = require("./routes/sub_category");
const app = express();

mongoose.connect(uri).then(() => {
		console.log("Successfully connected to MongoDB Atlas!");
	})
	.catch((error) => {
		console.log("Unable to connect to MongoDB Atlas!");
		console.error(error);
	});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(express.json());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS"
	);
	next();
});

app.use("/api", userRoutes);
app.get('/api/categories', async (req, res) => {
	try {
	  const categories = await Category.find();
	  res.status(200).json(categories);
	} catch (error) {
	  res.status(500).json({ error: error.message });
	}
  });
  app.get('/api/sub_categories', async (req, res) => {
	try {
	  const sub_categories = await Category.find();
	  res.status(200).json(sub_categories);
	} catch (error) {
	  res.status(500).json({ error: error.message });
	}
  });
module.exports = app;
