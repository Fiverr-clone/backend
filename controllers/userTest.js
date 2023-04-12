exports.signin = (req, res, next) => {
	User.findOne({ email: req.body.email })
		.then((user) => {
			if (!user) {
				return res.status(404).json({
					message: "User not found!",
					// error: error,
				});
			} else {
				return res.status(500).json({ message: "welcome to test" });
			}
		})
		.catch((err) => {
			return res.status(500).json({ message: err });
		});

	// User.findOne({ email: req.body.email })
	// 	// User.findOne({ email: req.body.email })
	// 	.then((user) => {
	// 		if (!user) {
	// 			return res.status(404).json({
	// 				message: "User not found!",
	// 				// error: error,
	// 			});
	// 		} else {
	// 			console.log("welcome");
	// 			console.log("email : ", user.email);
	// 			console.log("password : ", user.password);
	// 		}
	// 	})
	// 	.catch((error) => {
	// 		console.error("Error occurred:", error);
	// 		return res.status(500).json({
	// 			message: "Internal Server Error",
	// 		});
	// 	});
};
