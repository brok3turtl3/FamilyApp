const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const { check, validationResult } = require('express-validator');

//ENDPOINT  POST api/posts
//PURPOSE   Add new post
//ACCESS    Private

router.post(
	'/',
	[
		auth,
		[
			check('subject', 'Subect is required').not().isEmpty(),
			check('text', 'Post message is required').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const user = await User.findById(req.user.id).select('-password');

			const postFields = {
				subject: req.body.subject,
				text: req.body.text,
				name: user.name,
				user: req.user.id,
			};
			const newPost = new Post(postFields);
			await newPost.save();
			res.json(newPost);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
