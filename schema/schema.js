// const Category = require("../models/category");
// const SubCategory = require("../models/sub_category");

// const {
// 	GraphQLObjectType,
// 	GraphQLString,
// 	GraphQLID,
// 	GraphQLSchema,
// 	GraphQLList,
// } = require("graphql");

// // sub-category type
// const SubCategoryType = new GraphQLObjectType({
// 	name: "SubCategory",
// 	fields: () => ({
// 		id: { type: GraphQLID },
// 		category: {
// 			type: CategoryType,
// 			resolve(parent, args) {
// 				return Category.findById(parent.category_id);
// 			},
// 		},
// 		name: { type: GraphQLString },
// 	}),
// });
// // category type
// const CategoryType = new GraphQLObjectType({
// 	name: "Category",
// 	fields: () => ({
// 		id: { type: GraphQLID },
// 		categoryName: { type: GraphQLString },
// 	}),
// });

// const RootQuery = new GraphQLObjectType({
// 	name: "RootQueryType",
// 	fields: {
// 		sub_categories: {
// 			type: new GraphQLList(SubCategoryType),
// 			resolve(parent, args) {
// 				return SubCategory.find();
// 			},
// 		},

// 		sub_category: {
// 			type: SubCategoryType,
// 			args: { id: { type: GraphQLID } },
// 			resolve(parent, args) {
// 				return SubCategory.findById(args.id);
// 			},
// 		},
// 		categories: {
// 			type: new GraphQLList(CategoryType),
// 			resolve(parent, args) {
// 				return Category.find();
// 			},
// 		},
// 		category: {
// 			type: CategoryType,
// 			args: { id: { type: GraphQLID } },
// 			resolve(parent, args) {
// 				return Category.findById(args.id);
// 			},
// 		},
// 	},
// });

// mutations
// const mutation = new GraphQLObjectType({
// 	name: "Mutation",
// 	fields: {
// 		addCategory: {
// 			type: CategoryType,
// 			args: {
// 				name: { type: GraphQLString },
// 			},
// 			resolve(parent, args) {
// 				let category = new Category({
// 					name: args.name,
// 				});
// 				return category.save();
// 			},
// 		},
// 	},
// });

module.exports = new GraphQLSchema({ query: RootQuery });
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
		// Définissez les autres champs du service ici
	}),
});

// Définissez le type Category
const CategoryType = new GraphQLObjectType({
	name: "Category",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		services: {
			type: new GraphQLList(ServiceType),
			resolve(parent, args) {
				// Récupérez les services ayant l'ID de la catégorie parent
				return Service.find({ category: parent.id });
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
