import express from 'express';
const router = express.Router();
import auth from '../../middleware/auth.js';
import User from '../../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import { check, validationResult } from 'express-validator';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

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

			if (!isMatch) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'Invalid Credentials' }] });
			}

			//CREATE AND RETURN JSONWEBTOKEN
			const payload = {
				user: {
					id: user.id,
					name: user.name,
				},
			};

			jwt.sign(
				payload,
				process.env.JWT_SECRET,
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

//ROUTE  		POST api/auth/forgot-password
//PURPOSE  	Send a reset link to user for a forgotten password reset
//ACCESS  	Public

router.post('/forgot-password', async (req, res) => {
	const { email } = req.body;

	try {
		const oldUser = await User.findOne({ email });

		if (!oldUser) {
			return res
				.status(400)
				.json({ errors: [{ msg: 'Email does not exist in our records' }] });
		}

		const secret = process.env.JWT_SECRET + oldUser.password;
		const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
			expiresIn: '5m',
		});

		const link = `https://family-app-cdn.herokuapp.com/api/auth/reset-password/${oldUser._id}/${token}`;
		var transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'our.family.matters.cdn@gmail.com',
				pass: 'oxntfkqdefrzcbjt',
			},
		});

		var mailOptions = {
			from: 'brok3turtl3@gmail.com',
			to: email,
			subject: 'Password Reset Link',
			text: link,
		};

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});

		res.json(oldUser);
	} catch (error) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

//ROUTE  		GET api/auth/reset-password
//PURPOSE  	Verify reset token and provide password reset form
//ACCESS  	Public

router.get('/reset-password/:id/:token', async (req, res) => {
	const { id, token } = req.params;
	console.log(req.params);

	const oldUser = await User.findOne({ _id: id });

	if (!oldUser) {
		return res
			.status(400)
			.json({ errors: [{ msg: 'Email does not exist in our records' }] });
	}
	const secret = process.env.JWT_SECRET + oldUser.password;
	try {
		const verify = jwt.verify(token, secret);
		res.render('index', { email: verify.email, status: 'Not Verified' });
	} catch (error) {
		res.send('Not verified');
	}
});

//ROUTE  		POST api/auth/reset-password
//PURPOSE  	Reset users password
//ACCESS  	Public

router.post('/reset-password/:id/:token', async (req, res) => {
	const { id, token } = req.params;

	//TODO NEED PASSWORD VALIDATION DONE HERE
	const { password } = req.body;

	const oldUser = await User.findOne({ _id: id });

	if (!oldUser) {
		return res
			.status(400)
			.json({ errors: [{ msg: 'Email does not exist in our records' }] });
	}
	const secret = process.env.JWT_SECRET + oldUser.password;

	try {
		const verify = jwt.verify(token, secret);
		// res.render('index', {email: verify.email})
		const salt = await bcrypt.genSalt(10);
		const encryptedPassword = await bcrypt.hash(password, salt);
		await User.updateOne(
			{
				_id: id,
			},
			{
				$set: {
					password: encryptedPassword,
				},
			}
		);
		// res.json({status: 'Password Updated'})
		res.render('index', { email: verify.email, status: 'verified' });
	} catch (error) {
		res.send('Something went wrong');
	}
});

export default router;
