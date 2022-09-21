import express from 'express';
const router = express.Router();
import auth from '../../middleware/auth.js';

import User from '../../models/User.js';
import Bug from '../../models/Bug.js';

import { check, validationResult } from 'express-validator';

//ENDPOINT  POST api/bugs
//PURPOSE   Add a new bug post
//ACCESS    Private
router.post(
	'/',
	[auth, [check('text', 'Post message is required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { text, image } = req.body;

		try {
			const user = await User.findById(req.user.id).select('-password');

			const bugFields = {};

			if (text) bugFields.text = text;
			if (image) bugFields.image = image;
			bugFields.name = user.name;
			bugFields.user = req.user.id;

			const newBug = new Bug(bugFields);
			await newBug.save();
			res.json(newBug);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Server Error');
		}
	}
);

//ENDPOINT  GET api/bugs
//PURPOSE   Retrieve all bug posts
//ACCESS    Private
router.get('/', auth, async (req, res) => {
	try {
		const bugs = await Bug.find().sort({ date: -1 });
		res.json(bugs);
	} catch (error) {
		console.error(error.message);
		res.status(500).semd('Server Error');
	}
});

//ENDPOINT  DELETE api/bugs/:bugId
//PURPOSE   Delete a bug post by ID
//ACCESS    Private
router.delete('/:bugId', auth, async (req, res) => {
	try {
		//CHECK TO SEE IF POST EXISTS
		const bug = await Bug.findById(req.params.bugId);
		if (!bug) {
			return res.status(404).json({ msg: 'Bug post not found' });
		}
		//CHECK TO SEE IF CURRENT USER MATCHES USERID FOR POST
		if (bug.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User not authorized' });
		}
		//REMOVE POST
		await bug.remove();
		res.json({ msg: 'Bug post removed' });
	} catch (error) {
		console.error(error.message);
		if (error.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Bug post not found' });
		}
		res.status(500).send('Server Error');
	}
});

export default router;
