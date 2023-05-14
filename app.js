const express = require("express");
const { graphqlHTTP } = require("express-graphql");
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.CLUSTER_USERNAME}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const userRoutes = require("./routes/user");
const app = express();

const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql");
mongoose
  .connect(uri)
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
  });

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.use("/images", express.static(path.join(__dirname, "images")));

const schema = require("./schema/schema");
const { graphqlHTTP } = require("express-graphql");

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.use(
	"/graphql",
	graphqlHTTP({
		schema,
		graphiql: true,
	})
);

app.use("/api", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/sub-category", subCategoryRoutes);

app.use("/api", serviceRoutes);


module.exports = app;

//the old code 

// const express = require("express");
// require("dotenv").config();

// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
// const mongoose = require("mongoose");
// const path = require("path");

// const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.CLUSTER_USERNAME}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// const userRoutes = require("./routes/user");
// const categoryRoutes = require("./routes/category");
// const subCategoryRoutes = require("./routes/sub_category");
// const serviceRoutes = require("./routes/service");
// const app = express();

// mongoose
// 	.connect(uri)
// 	.then(() => {
// 		console.log("Successfully connected to MongoDB Atlas!");
// 	})
// 	.catch((error) => {
// 		console.log("Unable to connect to MongoDB Atlas!");
// 		console.error(error);
// 	});

// app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.use((req, res, next) => {
// 	res.setHeader("Access-Control-Allow-Origin", "*");
// 	res.setHeader(
// 		"Access-Control-Allow-Headers",
// 		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
// 	);
// 	res.setHeader(
// 		"Access-Control-Allow-Methods",
// 		"GET, POST, PUT, DELETE, PATCH, OPTIONS"
// 	);
// 	next();
// });

// app.use("/images", express.static(path.join(__dirname, "images")));



// app.use("/api", userRoutes);
// app.use("/api/categories", categoryRoutes);
// app.use("/api/sub-category", subCategoryRoutes);

// app.use("/api", serviceRoutes);

// module.exports = app;
