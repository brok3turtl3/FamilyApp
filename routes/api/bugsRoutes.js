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
			bugFields.posterImage = user.profilePic;

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

//ENDPOINT  GET api/bugs/:bugId
//PURPOSE   Retrieve a bug by ID
//ACCESS    Private
router.get('/:bugId', auth, async (req, res) => {
	try {
		const bug = await Bug.findById(req.params.bugId);
		if (!bug) {
			return res.status(404).json({ msg: 'Post not found' });
		}
		res.json(bug);
	} catch (error) {
		console.error(error.message);
		if (error.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Post not found' });
		}
		res.status(500).send('Server Error');
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

//ENDPOINT  POST api/bugs/comment/:bugId
//PURPOSE   Comment on a bug
//ACCESS    Private
router.post(
	'/comment/:bugId',
	[auth, [check('text', 'Post message is required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const user = await User.findById(req.user.id).select('-password');
			const bug = await Bug.findById(req.params.bugId);

			const newComment = {
				text: req.body.text,
				name: user.name,
				user: req.user.id,
			};

			bug.comments.unshift(newComment);

			await bug.save();
			res.json(bug.comments);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Server Error');
		}
	}
);

//ENDPOINT  DELETE api/bugs/comment/:bugId/:commentId
//PURPOSE   Delete a comment from a post
//ACCESS    Private
router.delete('/comment/:postId/:commentId', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId);
		const comment = post.comments.find(
			(comment) => comment.id === req.params.commentId
		);

		if (!comment) {
			return res.status(404).json({ msg: 'Comment does not exist' });
		}

		if (req.user.id !== comment.user.toString()) {
			return res
				.status(401)
				.json({ msg: 'Not authorized to delete this comment' });
		}

		const indexToRemove = post.comments.indexOf(comment);
		post.comments.splice(indexToRemove, 1);
		post.save();
		res.json(post.comments);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Errror');
	}
});

export default router;
