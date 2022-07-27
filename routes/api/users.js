const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');

// @route   POST api/users
// @ desc   Register User
// @access  Public

router.post(
	'/',
	//VALIDATION PARAMETERS AS SECOND MIDDLEWARE ARGUMENT
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'Please include a valid email').isEmail(),
		check(
			'password',
			'Please enter a password with 6 or more characters'
		).isLength({ min: 6 }),
	],
	async (req, res) => {
		//CALL VALIDATOR ON REQ AND IF THERE ARE ERRORS RETURN BAD REQ STATUS AND JSON OBJECT WITH ERROR MESSAGES
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		//DESTRUCTURE DATA FROM REQ.BODY FOR EASE OF USE
		const { name, email, password } = req.body;

		try {
			//SEE IF USER EXISTS
			//USING EMAIL INSTEAD OF EMAIL: EMAIL
			//USING AWAIT TO WAIT FOR SERVER RESPONSE
			let user = await User.findOne({ email });
			if (user) {
				res.status(400).json({ errors: [{ msg: 'User already exists' }] });
			}

			user = new User({
				name,
				email,
				password,
			});

			//ENCRYPT PASSWORD AND SAVE USER
			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			await user.save();

			//RETURN JSONWEBTOKEN

			res.send('User registered');
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
