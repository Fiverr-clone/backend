const User = require("../models/user");

const Category = require("../models/category");
const SubCategory = require("../models/sub_category");
const Service = require("../models/service");
const Order = require("../models/order");
const Conversation = require("../models/conversation");
const Message = require("../models/message");

const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLList,
	GraphQLSchema,
	GraphQLNonNull,
	GraphQLInt,
	GraphQLBoolean,
} = require("graphql");
const { default: conversation } = require("../models/conversation");

// Service
const ServiceType = new GraphQLObjectType({
	name: "Service",
	fields: () => ({
		id: { type: GraphQLID },
		userId: { type: GraphQLID },
		category: {
			type: CategoryType,
			resolve(parent, args) {
				return Category.findById(parent.category)
					.then((category) => {
						console.log(category);
						return category;
					})
					.catch((err) => {
						console.log(err);
						throw new Error("Failed to fetch category");
					});
			},
		},
		subCategory: {
			type: SubCategoryType,
			resolve(parent, args) {
				return SubCategory.findById(parent.subCategory)
					.then((subCategory) => {
						return subCategory;
					})
					.catch((err) => {
						console.log(err);
						throw new Error("Failed to fetch subcategory");
					});
			},
		},
		user: {
			type: UserType,
			resolve(parent, args) {
				return User.findById(parent.userId);
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
			args: {
				page: { type: GraphQLInt },
				limit: { type: GraphQLInt },
			},
			resolve(parent, { page, limit }) {
				const skip = (page - 1) * limit;
				return Service.find({ category: parent.id })
					.sort({ _id: -1 })
					.skip(skip)
					.limit(limit);
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
			args: {
				page: { type: GraphQLInt },
				limit: { type: GraphQLInt },
			},
			resolve(parent, { page, limit }) {
				const skip = (page - 1) * limit;
				return Service.find({ subCategory: parent.id })
					.sort({ _id: -1 })
					.skip(skip)
					.limit(limit);
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
		email: { type: GraphQLString },
		services: {
			type: new GraphQLList(ServiceType),
			args: {
				page: { type: GraphQLInt },
				limit: { type: GraphQLInt },
			},
			resolve(parent, { page, limit }) {
				const skip = (page - 1) * limit;
				return Service.find({ userId: parent.id })
					.sort({ _id: -1 })
					.skip(skip)
					.limit(limit);
			},
		},
	}),
});

// Order
const OrderType = new GraphQLObjectType({
	name: "Order",
	fields: () => ({
		id: { type: GraphQLID },
		service: {
			type: ServiceType,
			resolve(parent, args) {
				return Service.findById(parent.serviceId);
			},
		},
		seller: {
			type: UserType,
			resolve(parent, args) {
				return User.findById(parent.sellerId);
			},
		},
		buyer: {
			type: UserType,
			resolve(parent, args) {
				return User.findById(parent.buyerId);
			},
		},
		isCompleted: { type: GraphQLBoolean },
		isComfirmed: { type: GraphQLBoolean },
		createdAt: { type: GraphQLString },
	}),
});

//Conversation
const ConversationType = new GraphQLObjectType({
	name: "Conversation",
	fields: () => ({
		// id: { type: GraphQLID },
		id: { type: GraphQLID },
		transmitter: {
			type: UserType,
			resolve(parent, args) {
				return User.findById(parent.transmitterId);
			},
		},
		receiver: {
			type: UserType,
			resolve(parent, args) {
				return User.findById(parent.receiverId);
			},
		},
		readByUser: { type: GraphQLBoolean },
		lastMessage: { type: GraphQLString },
		// createdAt: { type: GraphQLString },
		// updatedAt: { type: GraphQLString },
	}),
});

//Message

const MessageType = new GraphQLObjectType({
	name: "Message",
	fields: () => ({
		id: { type: GraphQLID },
		userId: { type: GraphQLID },
		User: {
			type: UserType,
			resolve(parent, args) {
				return User.findById(parent.userId);
			},
		},
		Conversation: {
			type: ConversationType,
			resolve(parent, args) {
				return Conversation.findById(parent.conversationId);
			},
		},

		desc: { type: GraphQLString },
	}),
});

// Root Query
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
		user: {
			type: UserType,
			args: { id: { type: GraphQLNonNull(GraphQLID) } },
			resolve(parent, args) {
				return User.findById(args.id);
			},
		},
		service: {
			type: ServiceType,
			args: { id: { type: GraphQLNonNull(GraphQLID) } },
			resolve(parent, args) {
				return Service.findById(args.id);
			},
		},
		ordersBySellerId: {
			type: new GraphQLList(OrderType),
			args: {
				sellerId: { type: GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, { sellerId }) {
				return Order.find({
					sellerId,
					isCompleted: false,
					isComfirmed: true,
				}).sort({ createdAt: -1 });
			},
		},
		ordersByBuyerId: {
			type: new GraphQLList(OrderType),
			args: {
				buyerId: { type: GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, { buyerId }) {
				return Order.find({
					buyerId,
					isCompleted: false,
					isComfirmed: false,
				}).sort({ createdAt: -1 });
			},
		},

		conversationsByUserId: {
			type: GraphQLList(ConversationType),
			args: {
				userId: { type: GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, { userId }) {
				return Conversation.find({
					$or: [{ transmitterId: userId }, { receiverId: userId }],
				}).sort({ updatedAt: -1 });
			},
		},
		conversation: {
			type: ConversationType,
			args: { id: { type: GraphQLNonNull(GraphQLID) } },
			resolve(parent, args) {
				return Conversation.findById(args.id);
			},
		},
		message: {
			type: GraphQLList(MessageType),
			args: {
				userId: { type: GraphQLNonNull(GraphQLID) },
				conversationId: { type: GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, { conversationId }) {
				return Message.find({ conversationId }).sort({ createdAt: 1 });
			},
		},
	},
});

// Mutation
const RootMutation = new GraphQLObjectType({
	name: "RootMutationType",
	fields: {
		deleteService: {
			type: GraphQLString,
			args: {
				serviceId: { type: GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, { serviceId }) {
				return Service.findByIdAndDelete(serviceId)
					.then(() => {
						console.log("Service deleted successfully");
					})
					.catch((err) => {
						console.log(err);
						throw new Error("Failed to delete service");
					});
			},
		},
		createOrder: {
			type: OrderType,
			args: {
				serviceId: { type: GraphQLNonNull(GraphQLID) },
				sellerId: { type: GraphQLNonNull(GraphQLID) },
				buyerId: { type: GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, { serviceId, sellerId, buyerId }) {
				const order = new Order({
					serviceId,
					sellerId,
					buyerId,
					isCompleted: false,
					createdAt: Date.now(),
				});
				return order
					.save()
					.then(() => {
						console.log("Service purchased");
					})
					.catch((err) => {
						console.log(err);
						throw new Error("Failed to purchase service");
					});
			},
		},
		completeOrder: {
			type: OrderType,
			args: {
				id: { type: GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, { id }) {
				return Order.findByIdAndUpdate(id, { isCompleted: true })
					.then(() => {
						console.log("Order marked as completed ");
					})
					.catch((err) => {
						console.log(err);
						throw new Error("Failed to mark order as completed");
					});
			},
		},
		comfirmOrder: {
			type: OrderType,
			args: {
				id: { type: GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, { id }) {
				return Order.findByIdAndUpdate(id, { isComfirmed: true })
					.then(() => {
						console.log("Order comfirmed ");
					})
					.catch((err) => {
						console.log(err);
						throw new Error("Failed to mark order as comfirmed");
					});
			},
		},
		cancelOrder: {
			type: OrderType,
			args: {
				id: { type: GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, { id }) {
				return Order.findById(id)
					.then((order) => {
						if (order.isComfirmed) {
							throw new Error("Cannot cancel a confirmed order");
						}
						return Order.findByIdAndDelete(id)
							.then(() => {
								console.log("Order deleted successfully");
								return order;
							})
							.catch((err) => {
								console.log(err);
								throw new Error("Failed to delete order");
							});
					})
					.catch((err) => {
						console.log(err);
						throw new Error("Order not found");
					});
			},
		},
		createConversation: {
			type: ConversationType,
			args: {
				transmitterId: { type: GraphQLNonNull(GraphQLID) },
				receiverId: { type: GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, { transmitterId, receiverId }) {
				return Conversation.findOne({
					$or: [
						{ transmitterId, receiverId },
						{ transmitterId: receiverId, receiverId: transmitterId },
					],
				}).then((existingConversation) => {
					if (existingConversation) {
						throw new Error("Conversation already exists");
					} else {
						const conversation = new Conversation({
							transmitterId,
							receiverId,
						});
						return conversation.save();
					}
				});
			},
		},
		updateConversation: {
			type: ConversationType,
			args: {
				id: { type: GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, { id }) {
				return Conversation.findOneAndUpdate({ _id: id }, { readByUser: true });
			},
		},
		deleteConversation: {
			type: ConversationType,
			args: {
				id: { type: GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, { id }) {
				return Conversation.findByIdAndDelete(id)
					.then(() => {
						console.log("Conversation deleted successfully");
					})
					.catch((err) => {
						console.log(err);
						throw new Error("Failed to delete conversation");
					});
			},
		},
		createMessage: {
			type: MessageType,
			args: {
				conversationId: { type: GraphQLNonNull(GraphQLID) },
				userId: { type: GraphQLNonNull(GraphQLID) },
				desc: { type: GraphQLNonNull(GraphQLString) },
			},
			async resolve(parent, { conversationId, userId, desc }) {
				try {
					const newMessage = new Message({
						conversationId,
						userId,
						desc,
					});
					const savedMessage = await newMessage.save();
					await Conversation.findOneAndUpdate(
						{ _id: conversationId },
						{
							$set: {
								lastMessage: desc,
							},
						},
						{ new: true }
					);
					return savedMessage;
				} catch (err) {
					throw new Error("Failed to create message");
				}
			},
		},
	},
});
module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: RootMutation,
});
