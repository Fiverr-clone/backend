const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
	// Get the token from the request header
	const token = req.cookies.token;

	// Check if the token is missing
	if (!token) {
		return res.status(401).json({ msg: "No token, authorization denied" });
	}

	try {
		// Verify the token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// Add the user to the request object
		req.user = decoded;

		// Move on to the next middleware
		next();
	} catch (err) {
		// Handle token verification errors
		res.status(401).json({ msg: "Token is not valid" });
	}
};

// module.exports = auth;
