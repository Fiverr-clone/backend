const Category = require("../models/category");
const SubCategory = require("../models/sub_category");
const Service = require("../models/service");
const User = require("../models/user");

const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLList,
	GraphQLSchema,
	GraphQLNonNull,
} = require("graphql");

// Service
const ServiceType = new GraphQLObjectType({
	name: "Service",
	fields: () => ({
		id: { type: GraphQLID },
		userId: { type: GraphQLID },
		user: {
			username: { type: GraphQLID },
			type: UserType,
			resolve(parent, args) {
				return User.findById(parent.userId); // Retrieve the user based on the userId
			},
		},
		title: { type: GraphQLString },
		description: { type: GraphQLString },
		image: { type: GraphQLString },
		price: { type: GraphQLString },
		deliveryTime: { type: GraphQLString },
		buyerInstruction: { type: GraphQLString },
	}),
});

//Category
const CategoryType = new GraphQLObjectType({
	name: "Category",
	fields: () => ({
		id: { type: GraphQLID },
		categoryName: { type: GraphQLString },
		services: {
			type: new GraphQLList(ServiceType),
			resolve(parent, args) {
				return Service.find({ category: parent.id });
			},
		},
	}),
});

// SubCategory
const SubCategoryType = new GraphQLObjectType({
	name: "SubCategory",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		category: {
			type: CategoryType,
			resolve(parent, args) {
				return Category.findById(parent.category_id);
			},
		},
		services: {
			type: new GraphQLList(ServiceType),
			resolve(parent, args) {
				return Service.find({ subCategory: parent.id });
			},
		},
	}),
});

// User
const UserType = new GraphQLObjectType({
	name: "User",
	fields: () => ({
		id: { type: GraphQLID },
		username: { type: GraphQLID },
	}),
});

// Définissez la racine de la requête (Root Query)
const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		category: {
			type: CategoryType,
			args: { id: { type: GraphQLNonNull(GraphQLID) } },
			resolve(parent, args) {
				return Category.findById(args.id);
			},
		},
		subcategory: {
			type: SubCategoryType,
			args: { id: { type: GraphQLNonNull(GraphQLID) } },
			resolve(parent, args) {
				return SubCategory.findById(args.id);
			},
		},
	},
});

module.exports = new GraphQLSchema({ query: RootQuery });
