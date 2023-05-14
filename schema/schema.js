const Category = require("../models/category");
const SubCategory = require("../models/sub_category");

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLSchema,
	GraphQLList,
} = require("graphql");

// sub-category type
const SubCategoryType = new GraphQLObjectType({
	name: "SubCategory",
	fields: () => ({
		id: { type: GraphQLID },
		category: {
			type: CategoryType,
			resolve(parent, args) {
				return Category.findById(parent.category_id);
			},
		},
		name: { type: GraphQLString },
	}),
});
// category type
const CategoryType = new GraphQLObjectType({
	name: "Category",
	fields: () => ({
		id: { type: GraphQLID },
		categoryName: { type: GraphQLString },
	}),
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		sub_categories: {
			type: new GraphQLList(SubCategoryType),
			resolve(parent, args) {
				return SubCategory.find();
			},
		},

		sub_category: {
			type: SubCategoryType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return SubCategory.findById(args.id);
			},
		},
		categories: {
			type: new GraphQLList(CategoryType),
			resolve(parent, args) {
				return Category.find();
			},
		},
		category: {
			type: CategoryType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Category.findById(args.id);
			},
		},
	},
});

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
