import express from 'express';
const router = express.Router();
import { check, validationResult } from 'express-validator';
import User from '../../models/User.js';
import bcrypt from'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';

//ROUTE   	POST api/users
//PURPOSE   Register User
//ACCESS  	Public

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
				//ADD RETURN TO RES.STATUS SO NO CONFLICT WITH FINAL RES.SEND
				return res
					.status(400)
					.json({ errors: [{ msg: 'User already exists' }] });
			}

			user = new User({
				name,
				email,
				password,
			});

			//ENCRYPT PASSWORD AND SAVE USER
			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			await user.save(); //RETURNS A PROMISE WITH NEW USER INFO INCLDING MONGODB _ID INFO

			//CREATE AND RETURN JSONWEBTOKEN
			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(payload, 
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if(err) throw err;
          res.json({token});
        }
        );
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

export default router;
