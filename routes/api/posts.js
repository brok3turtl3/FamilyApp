const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const { check, validationResult } = require('express-validator');

//ENDPOINT  POST api/posts
//PURPOSE   Add a new post
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

//ENDPOINT  GET api/posts
//PURPOSE   Retrieve all posts
//ACCESS    Private
router.get('/', auth, async (req, res) => {

  try {
    const posts = await Post.find().sort({date: -1});
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).semd('Server Errror')
  }
})

module.exports = router;
