const Category = require("../models/category");
const SubCategory = require("../models/sub_category");
const Service = require("../models/service");

const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLList,
	GraphQLSchema,
	GraphQLNonNull,
} = require("graphql");

// Définissez le type Service
const ServiceType = new GraphQLObjectType({
	name: "Service",
	fields: () => ({
		id: { type: GraphQLID },
		title: { type: GraphQLString },
		description: { type: GraphQLString },
		image: { type: GraphQLString },
		price: { type: GraphQLString },
		deliveryTime: { type: GraphQLString },
		buyerInstruction: { type: GraphQLString },
		// Définissez les autres champs du service ici
	}),
});

// Définissez le type Category
const CategoryType = new GraphQLObjectType({
	name: "Category",
	fields: () => ({
		id: { type: GraphQLID },
		categoryName: { type: GraphQLString },
		services: {
			type: new GraphQLList(ServiceType),
			resolve(parent, args) {
				// Récupérez les services ayant l'ID de la catégorie parent
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
				// Récupérez les services ayant l'ID de la catégorie parent
				return Service.find({ subCategory: parent.id });
			},
		},
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
				// Récupérez la catégorie par son ID
				return Category.findById(args.id);
			},
		},
		subcategory: {
			type: SubCategoryType,
			args: { id: { type: GraphQLNonNull(GraphQLID) } },
			resolve(parent, args) {
				// Récupérez la catégorie par son ID
				return SubCategory.findById(args.id);
			},
		},
	},
});

module.exports = new GraphQLSchema({ query: RootQuery });

// const Category = require("../models/category");
// const Service = require("../models/service");

// const {
//   GraphQLObjectType,
//   GraphQLID,
//   GraphQLString,
//   GraphQLList,
//   GraphQLSchema,
//   GraphQLNonNull, // Importez ce module supplémentaire pour gérer les arguments obligatoires
// } = require('graphql');

// // Définissez le type Service
// const ServiceType = new GraphQLObjectType({
//   name: 'Service',
//   fields: () => ({
//     id: { type: GraphQLID },
//     title: { type: GraphQLString },
//     // Définissez les autres champs du service ici
//   }),
// });

// // Définissez le type Category
// const CategoryType = new GraphQLObjectType({
//   name: 'Category',
//   fields: () => ({
//     id: { type: GraphQLID },
//     name: { type: GraphQLString },
//     services: {
//       type: new GraphQLList(ServiceType),
//       resolve(parent, args) {
//         // Récupérez les services ayant l'ID de la catégorie parent
//         return Service.getServicesByCategoryId(parent.id);
//       },
//     },
//   }),
// });

// // Définissez la racine de la requête (Root Query)
// const RootQuery = new GraphQLObjectType({
//   name: 'RootQueryType',
//   fields: {
//     category: {
//       type: CategoryType,
//       args: { id: { type: GraphQLNonNull(GraphQLID) } },
//       resolve(parent, args) {
//         // Récupérez la catégorie par son ID
//         return Category.getCategoryById(args.id);
//       },
//     },
//   },
// });

// module.exports = new GraphQLSchema({ query: RootQuery });
