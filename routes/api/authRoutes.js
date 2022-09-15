import express from 'express';
const router = express.Router();
import auth from '../../middleware/auth.js';
import User from '../../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import { check, validationResult } from 'express-validator';

//ROUTE  		GET api/auth
//PURPOSE   Get user with current jwt
//ACCESS  	Public

router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

//ROUTE  		POST api/auth
//PURPOSE  	Authenticate User & get token
//ACCESS  	Public

router.post(
	'/',
	//VALIDATION PARAMETERS AS SECOND MIDDLEWARE ARGUMENT
	[
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Password is required').exists(),
	],
	async (req, res) => {
		//CALL VALIDATOR ON REQ AND IF THERE ARE ERRORS RETURN BAD REQ STATUS AND JSON OBJECT WITH ERROR MESSAGES
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		//DESTRUCTURE DATA FROM REQ.BODY FOR EASE OF USE
		const { email, password } = req.body;

		try {
			//SEE IF USER EXISTS
			//USING EMAIL INSTEAD OF EMAIL: EMAIL
			//USING AWAIT TO WAIT FOR SERVER RESPONSE
			let user = await User.findOne({ email });
			if (!user) {
				//ADD RETURN TO RES.STATUS SO NO CONFLICT WITH FINAL RES.SEND
				return res
					.status(400)
					.json({ errors: [{ msg: 'Invalid Credentials' }] });
			}

			const isMatch = await bcrypt.compare(password, user.password);
			console.log(isMatch);

			if (!isMatch) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'Invalid Credentials' }] });
			}

			//CREATE AND RETURN JSONWEBTOKEN
			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{ expiresIn: 360000 },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

export default router;
